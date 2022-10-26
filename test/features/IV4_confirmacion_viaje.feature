@wip
Feature: IV4 Confirmación de viaje
    Como pasajero quiero poder confirmar la realización del viaje
    
    Scenario: IV4.1 Confirmación del viaje
        Given No hay usuarios registrados
        And Me registro como pasajero con email "mateo@mateo.com" y ubicación preferida "Av. Paseo Colón 850"
        And cotizo un viaje 

    Scenario: IV4.2 Rechazo del viaje

Criterios de aceptación

    CA 1: Confirmación del viaje
        Cuando se realiza la confirmación del viaje
        Entonces se deberá iniciar la solicitud de búsqueda de chofer para iniciar el viaje correspondiente
    CA 2: Rechazo del viaje
        Cuando se realiza el rechazo del viaje
        Entonces se deberá informar que el usuario rechazo el viaje y se cancelará todo el proceso.
