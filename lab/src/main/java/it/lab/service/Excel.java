package it.lab.service;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class Excel {
    public static void suaCell(){

    }
    public static void taoBaoCaoNgay(){
        String filePath = "/Users/quanganhdo/Documents/it/Template.xlsx";

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            Workbook workbook = new XSSFWorkbook(fileInputStream);
            Sheet sheet = workbook.getSheetAt(1); // Lấy sheet đầu tiên
            Row row = sheet.getRow(27); // Lấy dòng thứ 2 (index bắt đầu từ 0)
            Cell cell = row.getCell(9); // Lấy ô thứ 2 (index bắt đầu từ 0)
            if (cell == null) {
                cell = row.createCell(1); // Tạo ô nếu chưa tồn tại
            }
            cell.setCellValue(2);

            try (FileOutputStream fileOutputStream = new FileOutputStream(filePath)) {
                workbook.write(fileOutputStream);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
