@now
Feature: AS1 Modificación de reglas de cotización
      Como administrador del sistema quiero poder tener flexibilidad a la hora de establecer los precios.
      Para esto se exige que el cálculo del precio sea realizado utilizando un sistema de reglas.
  @wip
  Scenario: AS1.1 Obtener coeficientes de reglas
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador
    When como usuario 'mateo' obtengo los coeficientes de cotizacion
    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.23'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.34'
      And el coeficiente 'modificador rating' llamado 'c_km' es '3.45'
      And el coeficiente 'costo_minimo' llamado 'c_min' es '4.56'

  @wip
  Scenario: AS1.2 Probar reglas de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador
    When como usuario 'mateo' obtengo los coeficientes de cotizacion
    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.23'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.34'
      And el coeficiente 'modificador rating' llamado 'c_km' es '3.45'
      And el coeficiente 'costo_minimo' llamado 'c_min' es '4.56'
