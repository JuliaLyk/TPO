const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const militaryType = require('./models/militaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        return this.getPassengerPlanes().reduce((firstPlane, secondPlane) =>
            secondPlane.getPassengersCapacity() > firstPlane.getPassengersCapacity() ? secondPlane : firstPlane
        );
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === militaryType.TRANSPORT);
    }
    
    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === militaryType.BOMBER);
    }
    
    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((firstPlane, secondPlane) => firstPlane.getMaxFlightDistance() - secondPlane.getMaxFlightDistance());
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((firstPlane, secondPlane) => firstPlane.getMaxSpeed() - secondPlane.getMaxSpeed());
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((firstPlane, secondPlane) => firstPlane.getMinLoadCapacity() - secondPlane.getMinLoadCapacity());
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
