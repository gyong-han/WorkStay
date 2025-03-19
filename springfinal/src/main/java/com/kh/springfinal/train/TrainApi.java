package com.kh.springfinal.train;


import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("api/train")
@RequiredArgsConstructor
public class TrainApi {

    @Autowired
    private TrainMapper trainMapper;

//        @Scheduled(fixedDelay = 1000 * 60)
    public void trainList() throws IOException {

        String[] stationArr = new String[]{"서울", "대전", "동대구", "부산", "전주"};

        for (int i = 0; i < stationArr.length; ++i) {
            for (int j = 0; j < stationArr.length; ++j) {
                if (i == j) continue;
                callApi(stationArr[i], stationArr[j]);
            }
        }
    }

    public void callApi(String dep, String arr) throws IOException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String today = dateFormat.format(new Date());

        StringBuilder urlBuilder = new StringBuilder("https://apis.data.go.kr/B551457/run/v2/travelerTrainRunPlan2"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=5pm9KX684OM4XryIkLXwuGJqK38HLDndjK4VPmmJPxqWV%2BfPhB3k%2BT%2BCzQPnp2PrytC%2F8%2FA%2F3vUNAUMG1CVltQ%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("returnType","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*데이터 타입(xml, json)*/
        urlBuilder.append("&" + URLEncoder.encode("cond[run_ymd::GTE]","UTF-8") + "=" + URLEncoder.encode("20240904", "UTF-8")); /*운행일자 이후*/
        urlBuilder.append("&" + URLEncoder.encode("cond[run_ymd::LTE]","UTF-8") + "=" + URLEncoder.encode("20240904", "UTF-8")); /*운행일자 이전*/
//        urlBuilder.append("&" + URLEncoder.encode("cond[dptre_stn_cd::EQ]","UTF-8") + "=" + URLEncoder.encode("20250204", "UTF-8")); /*출발역코드*/
        urlBuilder.append("&" + URLEncoder.encode("cond[dptre_stn_nm::EQ]","UTF-8") + "=" + URLEncoder.encode(dep, "UTF-8")); /*출발역명*/
//        urlBuilder.append("&" + URLEncoder.encode("cond[arvl_stn_cd::EQ]","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*도착역코드*/
        urlBuilder.append("&" + URLEncoder.encode("cond[arvl_stn_nm::EQ]","UTF-8") + "=" + URLEncoder.encode(arr, "UTF-8")); /*도착역명*/

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader rd = new BufferedReader(new InputStreamReader(
                conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300
                        ? conn.getInputStream()
                        : conn.getErrorStream()
        ));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        String responseStr = sb.toString();


        // 정규표현식으로 데이터 추출
        List<TrainVo> trains = extractTrainData(responseStr);

        // DB에 저장
        for (TrainVo train : trains) {
            trainMapper.insertTrainSchedules(train);
        }
    }

    private List<TrainVo> extractTrainData(String json) {
        List<TrainVo> trainList = new ArrayList<>();

        // 정규식 패턴 설정
        String pattern = "\\{\\s*\"arvl_stn_cd\":\"(\\d+)\",\\s*\"arvl_stn_nm\":\"([^\"]+)\",\\s*\"dptre_stn_cd\":\"(\\d+)\",\\s*\"dptre_stn_nm\":\"([^\"]+)\",\\s*\"run_ymd\":\"(\\d+)\",\\s*\"trn_no\":\"(\\d+)\",\\s*\"trn_plan_arvl_dt\":\"([^\"]+)\",\\s*\"trn_plan_dptre_dt\":\"([^\"]+)\"\\s*\\}";
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(json);

        // 매칭된 데이터를 리스트로 변환
        while (matcher.find()) {
            TrainVo train = new TrainVo();
            train.setArvlStnCd(matcher.group(1));
            train.setArvlStnNm(matcher.group(2));
            train.setDptreStnCd(matcher.group(3));
            train.setDptreStnNm(matcher.group(4));
            train.setRunYmd(matcher.group(5));
            train.setTrnNo(matcher.group(6));
            train.setTrnPlanArvlDt(matcher.group(7));
            train.setTrnPlanDptreDt(matcher.group(8));
            trainList.add(train);
        }

        return trainList;
    }
}





