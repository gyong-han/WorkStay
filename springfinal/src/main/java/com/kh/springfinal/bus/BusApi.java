package com.kh.springfinal.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("api/bus")
public class BusApi {

    @Autowired
    private BusMapper busMapper;

    @GetMapping
//    @Scheduled(fixedDelay = 1000 * 60)
    public void busList() throws IOException {


        String[] terminalIdArr = new String[]{"NAEK010", "NAEK700", "NAEK300", "NAEK801", "NAEK343"};
        for (int i = 0; i < terminalIdArr.length; ++i) {
            for (int j = 0; j < terminalIdArr.length; ++j) {
                if (i == j) { continue; }
                String dep = terminalIdArr[i];
                String arr = terminalIdArr[j];
                callApi(dep, arr);
            }
        }
    }

    public String callApi(String dep, String arr) throws IOException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String today = dateFormat.format(new Date());

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=cgqxTHN7OgxplGw5JMpeIXVvTp39Fu10UCWAKcgJsc1J2l5S%2FZqA9R3rH%2BW2P0NJSrPjvRUVx9Hdz03OmhwzMA%3D%3D");
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=1");
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=50");
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=json");
        urlBuilder.append("&" + URLEncoder.encode("depTerminalId", "UTF-8") + "=" + URLEncoder.encode(dep, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("arrTerminalId", "UTF-8") + "=" + URLEncoder.encode(arr, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("depPlandTime", "UTF-8") + "=" + URLEncoder.encode(today, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("busGradeId", "UTF-8") + "=1");

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader rd = (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300)
                ? new BufferedReader(new InputStreamReader(conn.getInputStream()))
                : new BufferedReader(new InputStreamReader(conn.getErrorStream()));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        String responseStr = sb.toString();


        String arrPlaceNm = extractStringFromJson(responseStr, "arrPlaceNm");

        String arrPlandTime = extractStringFromJson2(responseStr, "arrPlandTime");
        Integer charge = extractIntegerFromJson(responseStr, "charge");
        String depPlaceNm = extractStringFromJson(responseStr, "depPlaceNm");
        String depPlandTime = extractStringFromJson2(responseStr, "depPlandTime");
        String gradeNm = extractStringFromJson(responseStr, "gradeNm");
        String routeId = extractStringFromJson(responseStr, "routeId");

        BusVo busVo = new BusVo();
        busVo.setArrPlaceNm(arrPlaceNm);
        busVo.setArrPlandTime(arrPlandTime);
        busVo.setCharge(charge);
        busVo.setDepPlaceNm(depPlaceNm);
        busVo.setDepPlandTime(depPlandTime);
        busVo.setGradeNm(gradeNm);
        busVo.setRouteId(routeId);

        busMapper.insertBusSchedule(busVo);

        return sb.toString();
    }

    private String extractStringFromJson(String json, String key) {
        String pattern = "\"" + key + "\":\"([^\"]+)\"";
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(json);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    public static String extractStringFromJson2(String json, String key) {
        String pattern = "\"" + key + "\":(\\d+)"; // 숫자 값을 매칭하는 정규식
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(json);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    private Integer extractIntegerFromJson(String json, String key) {
        String pattern = "\"" + key + "\":(\\d+)";
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(json);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return null;
    }



}
