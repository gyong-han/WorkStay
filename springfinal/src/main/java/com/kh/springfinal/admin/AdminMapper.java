package com.kh.springfinal.admin;

import com.kh.springfinal.host.TableVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AdminMapper {

    @Select("""
            SELECT S.NO AS NO,M.NAME AS HOST_NAME,M.EMAIL,S.NAME AS NAME,M.PHONE 
            FROM STAY S 
            JOIN MEMBER M ON(S.HOST_NO = M.NO)
            WHERE S.STATUS_NO= '1'
            """)
    List<TableVo> getStayEnrollReqList();

    @Select("""
            SELECT S.NO AS NO,M.NAME AS HOST_NAME,M.EMAIL,S.NAME AS NAME,M.PHONE 
            FROM SPACE S 
            JOIN MEMBER M ON(S.HOST_NO = M.NO)
            WHERE S.STATUS_NO= '1'
            """)
    List<TableVo> getSpaceEnrollReqList();

    @Select("""
            SELECT M.NO,M.NAME AS HOSTNAME,M.EMAIL,M.PHONE,COUNT(DISTINCT ST.NAME) AS stayCnt,COUNT(DISTINCT SP.NAME) AS spaceCnt
            FROM MEMBER M
            LEFT JOIN STAY ST ON (M.NO = ST.HOST_NO)
            LEFT JOIN SPACE SP ON (M.NO = SP.HOST_NO)
            WHERE HOST_PERMISSION = 'Y'
            GROUP BY M.NO, M.NAME,M.EMAIL,M.PHONE
            """)
    List<TableVo> getHostList();

    @Select("""
            SELECT NO,NAME AS HOSTNAME,EMAIL,PHONE
            FROM MEMBER
            WHERE NO=#{hostNo}
            """)
    TableVo getHostDetail(String hostNo);

    @Select("""
            SELECT S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS,MIN(FILE_PATH) AS FILE_PATH
            FROM STAY S
            JOIN ROOM R ON(S.NO = R.STAY_NO)
            JOIN ROOM_ATTACHMENT RA ON (R.NO = RA.ROOM_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'
            GROUP BY S.NAME,S.ADDRESS,S.PHONE,S.SNS,S.NO
            """)
    List<TableVo> getStayList(String hostNo);

    @Select("""
            SELECT S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS,MIN(FILE_PATH) AS FILE_PATH
            FROM SPACE S
            JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'           
            GROUP BY S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS  
            """)
    List<TableVo> getSpaceList(String hostNo);
}
