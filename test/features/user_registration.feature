Feature: U1 Registro de usuarios

Scenario: U1.1 Registro exitoso como conductor
    Given No hay usuarios registrados
    When Me registro como pasajero con email "mateo@mateo.com" y wallet "wallethg0122jk32ew4ho123"
    Then Un pasajero con email "mateo@mateo.com" y wallet "wallethg0122jk32ew4ho123" es creado

Scenario: U1.2 Obtención de ubicación
    Given No hay usuarios registrados
    When Me registro como pasajero con email "mateo@mateo.com" y ubicación preferida "Av. Paseo Colón 850"
    Then La ubicación preferida para el pasajero con email "mateo@mateo.com" es "Av. Paseo Colón 850"

Scenario: U1.3 Obtenció de perfil para choferes
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con email "mateo@mateo.com"
        And quiero registrar patente del auto "AAA 123"
        And quiero registrar fabricante del auto "Audi"
        And quiero registrar modelo del auto "TT"
        And quiero registrar año de fabricación del auto 2022
        And quiero registrar color del auto "Negro"
        And me registro como chofer
    Then La patente del auto registrado es "AAA 123"
        And el fabricante del auto es "Audi"
        And el modelo del auto es "TT"
        And el año de fabricación del auto es 2022
        And el color del auto es "Negro"
