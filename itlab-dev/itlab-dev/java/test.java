import java.util.*;

public class test{
    public static void main(String [] args){
        checkText();
    }
    static void checkText(){
        Scanner scanner = new Scanner(System.in);
        String a;
        a= scanner.nextLine();
        for(int i=0; i<a.length(); i++){
            if(a.contains("a")&&a.contains("b")){
                System.out.println("YES");

            }else{
                System.out.println("NO");
            }
        }
    }
}