package it.lab.common;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class CloudinaryUpload {

    private static String cloudName = "dh0kxilvg";
    private static String apiKey = "111557288631136";
    private static String apiSecret = "H93J0UqHhuLgQGei2qJTD6-G_SA";

    private static Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", cloudName,
            "api_key", apiKey,
            "api_secret", apiSecret
    ));

    public static String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file selected.");
        }
        File tmpFile = new File(UUID.randomUUID().toString() + "." + getFileExtension(file));
        file.transferTo(tmpFile);

        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(tmpFile, ObjectUtils.emptyMap());

            if (uploadResult.containsKey("error")) {
                // Xử lý lỗi tải lên
                throw new Exception(uploadResult.get("error").toString());
            }

            // Lấy URL công khai của tệp tải lên
            String imageUrl = uploadResult.get("secure_url").toString();

            // Tiếp tục xử lý hoặc lưu thông tin về tệp trong cơ sở dữ liệu

            return imageUrl;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error uploading file: " + e.getMessage());
        } finally {
            tmpFile.delete(); // Xóa tệp tạm sau khi tải lên
        }
    }

    private static String getFileExtension(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName != null) {
            int lastDotIndex = originalFileName.lastIndexOf(".");
            if (lastDotIndex != -1) {
                return originalFileName.substring(lastDotIndex + 1);
            }
        }
        return "";
    }
}
