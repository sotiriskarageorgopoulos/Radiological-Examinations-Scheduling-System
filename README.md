# Restful API
This API is used for modifying, fetching and sending data to a MongoDB ATLAS database. Particularly, includes 15 endpoints, which are presented in the below table.

Endpoints|Method|Parameters|Description
---|---|---|---
/api/register/:category|POST|category|Registration of a user in the system
/api/login|POST|-|Connection to the system
/api/insRadiologicalOrderDetails|POST|-|Saves a radiological command to the database
/api/sendMessage|POST|-|Saves a user's message to the administrator in the database
/api/getRadiologicalOrders|GET|-|A list of all radiological commands.
/api/getRadiologicalOrdersForRadiologist/:radiologistId|GET|radiologistId=[string], is referred to radologist id| Retrieve a radiologist's radiological instructions from the database
/api/sortRadiologistsIdByAvailability|GET|-|Retrieve radiologists sorted in ascending order based on the number of radiological orders they have to perform.
/api/getRadiologistById/:radiologistId|GET|radiologistId=[string], is referred to radologist id|Retrieve information from a radiologist based on the radiologist ID.
/api/getRadiologyOperations|GET|-|Fetch all radiological operations.
/api/getHospitals|GET|-|Fetch all Hospitals.
/api/getScheduledRadiologicalOrders|GET|-|Retrieve all scheduled appointments for radiological examinations.
/api/getRadiologicalOrder/:radiologyOrderCode|GET|radiologyOrderCode=[string], a code for unique indentification of radiology order.|Fetch a radiological command based on radiographic command code.
/api/scheduleRadiologyOrder/:patientCode|PUT|patientCode=[string], a code for unique indentification of patient. |Determining the date, time and radiologist for a patient's radiological examinations.
/api/updateProfile/:category|PUT|category=[string]|, is reffered to user's category|Update a user's profile information.
/api/deleteTheOldAppointments|DELETE|-|Deleting appointments whose date has passed.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Sotiris Karageorgopoulos
