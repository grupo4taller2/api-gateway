@wip
Feature: IV3 Cotización del viaje
  Como pasajero quiero poder saber previamente cual es el precio estimado del viaje a realizar,
  sabiendo el destino seleccionado y la modalidad de viaje.

  Scenario: IV3.1 Cotización de un viaje
    Given Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
    When solicito cotizar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
    Then se devuelve el precio para el viaje
