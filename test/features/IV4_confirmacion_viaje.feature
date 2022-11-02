Feature: IV4 Confirmación de viaje
  Como pasajero quiero poder confirmar la realización del viaje
  
  Scenario: IV4.1 Confirmación del viaje
    Given Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And me registro como pasajero
    When solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
    Then se inicia la solicitud de búsqueda de chofer para iniciar el viaje desde 'Av. Paseo Colón 850, Buenos Aires' hasta 'Gral. Las Heras 2214, Buenos Aires'
  @wip
  Scenario: IV4.2 Rechazo del viaje
