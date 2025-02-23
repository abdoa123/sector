db = require("../../../model");
const Op = db.Sequelize.Op;
const {Visit } = db;
const moment = require('moment'); // Import moment.js

const getLastPatientVisitByDoctorId = async (PatientId, DoctorId) => {
    try {
        // Find the last visit for the given PatientId and DoctorId
        const lastVisit = await Visit.findOne({
            where: {
                PatientId: PatientId,
                DoctorId: DoctorId,
            },
            order: [["createdAt", "DESC"]], // Order by createdAt in descending order to get the latest visit
        });

        if (lastVisit) {
            // If a visit is found, you can access its data using lastVisit
            return lastVisit;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const getDataForOtherUser = async(req, table, condition, order, include) => {
    const patientPin = req.isVaild;

    if (patientPin) {
        const data = await table.findAll({
            where: {
                ...condition
            },
            order,
            include

        })

        return data
    } else {
        const pinDate = req.pinDate
        if (!pinDate) return []
        const LastPin= moment(pinDate)
        .toDate();
        const createdAt = {
            [Op.lt]: LastPin.toISOString(),
        };
        const data = await table.findAll({
            where: {
                ...condition,
                createdAt,
            },
            order,
            include

        })
        // response with data
        return data
    }
}
const getDataForDoctor= async(req, PatientId, Doctor, table, condition, order, include) => {
    const patientPin = req.isVaild;

    if (patientPin) {
        const data = await table.findAll({
            where: {
                ...condition
            },
            order,
            include

        })

         return data
    } else {
        var getLastVisit = await getLastPatientVisitByDoctorId(
            PatientId,
            Doctor.id
        );
        if (getLastVisit == null) {
            // response with the Data
            
            return []
        }
        const oneHourAfterLastVisit = moment(getLastVisit.createdAt)
        .add(1, "hour")
        .toDate();
        oneHourAfterLastVisit.setHours(oneHourAfterLastVisit.getHours() + 1);
        const createdAt = {
            [Op.lt]: oneHourAfterLastVisit.toISOString(),
        };
        const data = await table.findAll({
            where: {
                ...condition,
                createdAt
            },
            order,
            include
        })
        
        return data
    }
}

const getDataforGuest = async(req, table, condition, order, include) => {
    const patientPin =  req.isVaild
    const isEmergency = req.isEmergency
    if (isEmergency) {
        const data = await table.findAll({
            where: {
                ...condition,
                DoctorId: null
            },
            order,
            include
    
        })
        return data
    }
    if (patientPin) {
    const data = await table.findAll({
        where: {
            ...condition  
        },
        order,
        include

    })
    return data
    } else {
        return []
    }
}
module.exports = {getDataForDoctor, getDataForOtherUser, getDataforGuest}