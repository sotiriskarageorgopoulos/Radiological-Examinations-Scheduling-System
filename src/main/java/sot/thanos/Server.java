package sot.thanos;

import sot.thanos.controllers.*;

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

        path("/api/", () -> {
            post("/register/:category", (req, res) -> RegisterController.register(req, res));
            post("/login", (req, res) -> LoginController.login(req, res));
            post("/insRadiologicalOrderDetails", (req, res) -> OrderSchedulingController.insRadiologicalOrderDetails(req, res));
            post("/sendMessage", (req, res) -> ContactController.sendContactMsg(req, res));
            get("/getRadiologicalOrders", (req, res) -> OrderSchedulingController.getRadiologicalOrders(req, res));
            get("/getRadiologicalOrdersForRadiologist/:radiologistId", (req, res) -> RadiologistController.getRadiologicalOrdersForRadiologist(req, res));
            get("/sortRadiologistsIdByAvailability", (req, res) -> RadiologistController.sortRadiologistsIdByAvailability(req, res));
            get("/getRadiologistById/:radiologistId", (req, res) -> RadiologistController.getRadiologistById(req, res));
            get("/getRadiologyOperations", (req, res) -> OrderSchedulingController.getRadiologyOperations(req, res));
            get("/getHospitals", (req, res) -> HospitalController.getHospitals(req, res));
            get("/getScheduledRadiologicalOrders", (req,res) -> OrderSchedulingController.getScheduledRadiologicalOrders(req,res));
            put("/scheduleRadiologyOrder/:patientCode", (req, res) -> OrderSchedulingController.scheduleRadiologyOrder(req, res));
            put("/updateProfile/:category", (req,res) -> ProfileController.updateProfile(req,res));
            delete("/deleteTheOldAppointments", (req, res) -> OrderSchedulingController.deleteTheOldAppointments(req, res));
        });

        options("/*",
                (request, response) -> {
                    String accessControlRequestHeaders = request
                            .headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers",
                                accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request
                            .headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods",
                                accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
            res.type("application/json");
        });
    }

}
