Feature: Busqueda de usuarios

  Scenario: Busqueda por email
    Given Me registro como pasajero con email "mateoicalvo@mateo.com" y wallet "wallethg0122jk32ew4ho123"
    When Realizo una busqueda por email con "mateoicalvo@mateo.com"
    Then Obtengo un pasajero con email "mateoicalvo@mateo.com"
