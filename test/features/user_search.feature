Feature: Busqueda de usuarios

  Scenario: Busqueda por email
    Given Me registro como pasajero con email "mateo@mateo.com" y wallet "wallethg0122jk32ew4ho123"
    When Realizo una busqueda por email con "mateo@mateo.com"
    Then Obtengo un pasajero con email "mateo@mateo.com"
