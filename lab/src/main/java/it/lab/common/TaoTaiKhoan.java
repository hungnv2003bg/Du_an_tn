package it.lab.common;

public class TaoTaiKhoan {
    public static String taoTaiKhoan(String code){
        String link = "http://localhost:3000/xacnhan/" + code;
        return """
                <!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
                                
                <head>
                    <meta charset=""UTF-8"">
                    <meta content=""width=device-width, initial-scale=1"" name=""viewport"">
                    <meta name=""x-apple-disable-message-reformatting"">
                    <meta http-equiv=""X-UA-Compatible"" content=""IE=edge"">
                    <meta content=""telephone=no"" name=""format-detection"">
                    <title></title>
                    <!--[if (mso 16)]>
                    <style type=""text/css"">
                    a {text-decoration: none;}
                    </style>
                    <![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG></o:AllowPNG>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                    <!--[if !mso]><!-- -->
                    <link href=""https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"" rel=""stylesheet"">
                    <!--<![endif]-->
                </head>
                                
                <body>
                <h3>Yêu cầu tạo tài khoản</h3>
                <p>Vui lòng ấn vào đường <a href=" """
                + link + """
                " target="_blank">Link</a> này để xác nhận tài khoản.</p>
                <p>Vui lòng bỏ qua email này nếu bạn không biết.</p>
                </body>
                </html>
                """;
    }
}
