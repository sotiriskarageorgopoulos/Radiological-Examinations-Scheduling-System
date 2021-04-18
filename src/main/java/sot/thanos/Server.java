package sot.thanos;
import sot.thanos.controllers.LoginController;
import sot.thanos.controllers.RegisterController;

import static spark.Spark.*;

public class Server {

    public static void main(String[] args) {
        ProcessBuilder process = new ProcessBuilder();
        Integer port;

        if (process.environment().get("PORT") != null) {
            port = Integer.parseInt(process.environment().get("PORT"));
        } else {
            port = 4567;
        }

        port(port);

        path("/api/",() -> {
            post("/register/:category",(req,res) -> RegisterController.register(req,res));
            get("/login",(req,res) -> LoginController.login(req,res));
        });
    }

}
