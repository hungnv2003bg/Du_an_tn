import java.sql.Array;
import java.sql.SQLOutput;
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String a;
        a = scanner.nextLine();
        boolean test = checkText(a);

        if (test) {
            System.out.println("YES");
        }else{
            System.out.println("NO");
        }
        int kq= checkNumber();
        System.out.println(kq);

    }
    static boolean checkText(String a){
        if(a.contains("a")&& a.contains("b")&&a.contains("c")&&a.contains("d")&&a.contains("e")&&
        a.contains("f")&& a.contains("g")&&a.contains("h")&& a.contains("i")&&a.contains("j")&&a.contains("k")&&
        a.contains("l")&& a.contains("m")&& a.contains("n")&&a.contains("o")&&a.contains("p")&&a.contains("q")&&
        a.contains("r")&&a.contains("s")&&a.contains("t")&& a.contains("u")&&a.contains("v")&& a.contains("w")&&
        a.contains("x")&&a.contains("y")&&a.contains("z")){
            return true;
        }
        return false;
    }
    static int checkNumber(){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Nhập vao số nguyên dương bất kì lớn hơn 0 và nhỏ hơn 600: ");
        int a = scanner.nextInt();
        if(a>0 && a<600){
            int j;
            if(a==10){
                return a;
            }else {
                int arr[] = new int [a];
                for(int i=9; i>0; i--){
                    if(a%i==0){
                        j = a%i;
                    }

                }
            }
        }
        return -1;
    }

    /**
     * Cau 5: benefits of the programming language that I am learning
     * The programming language that I am learning is Javascript. I used to study many programming language like
     * C++, Java, C, Python but the best language I found is Js. For me, Js is quite easy to understand for beginner, it's convinient and have high application.
     * It is also a popular programming language in the world so if I want to search something about it, I can find a lot of
     * material in the Internet. Absolutely, If I study more deeply into Js, it will not be simple anymore, but as I said, having many
     * document about js can support me. It is one of the reason I like Js the most. There is one more thing that make me love Js, it is
     * the salary that companies pay for js developers. If employees have big experience, they will get a handsome salary.
     */
}
