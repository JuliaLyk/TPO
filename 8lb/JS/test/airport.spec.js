const { assert } = require('chai');

const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const militaryType = require('../models/militaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const ExperimentalTypes = require('../models/experimentalTypes');
const ClassificationLevel = require('../models/classificationLevel');

describe('AirportandPlanes Tests', () => {
    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.TRANSPORT),
        new ExperimentalPlane('Bell X-14', 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane('Ryan X-13 Vertijet', 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];

    let airport = new Airport(planes);

    it('should have military planes with transport type', () => {
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        let hasTransportMilitaryPlanes = transportMilitaryPlanes.some(militaryPlane =>
            militaryPlane.getMilitaryType() === militaryType.TRANSPORT
        );
        assert.isTrue(hasTransportMilitaryPlanes, 'At least one military plane should have transport type');
    });

    it('should check passenger plane with max capacity', () => {
        let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.notEqual(expectedPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
    });

    it('should sort planes by max load capacity', () => {
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
        let isSortedByMaxLoadCapacity = planesSortedByMaxLoadCapacity.every((currentPlane, index) =>
            index === planesSortedByMaxLoadCapacity.length - 1 || currentPlane.getMinLoadCapacity() <= planesSortedByMaxLoadCapacity[index + 1].getMinLoadCapacity()
        );
        assert.isTrue(isSortedByMaxLoadCapacity, 'Planes are not sorted by max load capacity');
    });

    it('should have at least one bomber in military planes', () => {
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        assert.isNotEmpty(bomberMilitaryPlanes, 'At least one bomber should be in military planes');
    });

    it('should check that experimental planes have classification level higher than unclassified', () => {
        let experimentalPlanes = airport.getExperimentalPlanes();
        let hasUnclassifiedPlanes = experimentalPlanes.some(plane => plane.getClassificationLevel() === ClassificationLevel.UNCLASSIFIED);
        assert.isFalse(hasUnclassifiedPlanes, 'Experimental planes should not have unclassified classification level');
    });
});
