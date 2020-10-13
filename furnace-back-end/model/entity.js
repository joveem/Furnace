const mysql = require('mysql');
const entity = require('../controller/entity');

module.exports = {

    async createEntity(req, callback_) {

        var mysqlConnection_ = await mysql.createConnection({

            host: process.env.USER_PW || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.USER_PW || "",
            database: process.env.DB_NAME || "furnace"

        });

        if (req.body.type == 'company') {

            //search if company cnpj already exists


            mysqlConnection_.query("SELECT * FROM `company` WHERE cnpj = '" + req.body.cnpj + "'", function (queryError_, rows_, fields_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                } else {

                    if (rows_.length == 0) {

                        //no matchs, insert company on database

                        mysqlConnection_.query("INSERT INTO `company` (`id`, `name`, `cnpj`, `uf`) VALUES (NULL, '" + req.body.name + "', '" + req.body.cnpj + "', '" + req.body.uf + "') ", function (queryError_, rows_, fields_) {

                            if (queryError_) {

                                console.log("--- ERROR IN QUERY: " + queryError_);

                            } else {

                                companyId_ = "";

                                mysqlConnection_.query("SELECT * FROM `company` WHERE `cnpj` = '" + req.body.cnpj + "'", function (queryError_, rows_, fields_) {

                                    if (queryError_) {

                                        console.log("--- ERROR IN QUERY: " + queryError_);

                                    } else {

                                        companyId_ = rows_[0].id;

                                        mysqlConnection_.end();

                                        callback_({

                                            status: "1",
                                            desc: "Company created",
                                            data: {
                                                type: "company",
                                                id: companyId_
                                            }

                                        });

                                    }

                                })

                            }

                        })

                    } else {

                        //company cnpj is already in database

                        callback_({

                            status: "0",
                            desc: "company_register_failed_" + rows_.length + "_company_is_already_registered_with_this_cnpj",
                            data: {}

                        });

                    }

                }

            })


        } else if (req.body.type == 'provider') {

            //search if company name/cnpj already exists

            mysqlConnection_.query("SELECT * FROM `provider` WHERE document = '" + req.body.doc + "'", function (queryError_, rows_, fields_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                } else {

                    if (rows_.length == 0) {

                        //no matchs, insert provider on database

                        var query_ = req.body.is_legal_person == "1" ? "INSERT INTO `provider` (`id`, `name`, `document`, `is_legal_person`, `birthday`) VALUES (NULL, '" + req.body.name + "', '" + req.body.doc + "', '1', NULL)" : "INSERT INTO `provider` (`id`, `name`, `document`, `is_legal_person`, `birthday`) VALUES (NULL, '" + req.body.name + "', '" + req.body.doc + "', '0', '" + req.body.birthday + "')";

                        mysqlConnection_.query(query_, function (queryError_, rows_, fields_) {

                            if (queryError_) {

                                console.log("--- ERROR IN QUERY: " + queryError_);

                            } else {


                                providerId_ = "";

                                mysqlConnection_.query("SELECT * `provider' WHERE `document` = '" + req.body.cnpj + "'", function (queryError_, rows_, fields_) {

                                    if (queryError_) {

                                        console.log("--- ERROR IN QUERY: " + queryError_);

                                    } else {

                                        providerId_ = rows_[0].id;

                                        callback_({

                                            status: "1",
                                            desc: "Provider created",
                                            data: {
                                                type: "provider",
                                                id: providerId_
                                            }

                                        });

                                    }

                                })

                            }

                        })

                    } else {

                        //provider document is already in database

                        callback_({

                            status: "0",
                            desc: "provider_register_failed_" + rows_.length + "_provider_is_already_registered_with_this_document",
                            data: {}

                        });

                    }

                }

            })

        } else {

            //bad request
            res.status(400).send('incorrect entity type');

        }
    },

    async getAllEntities(callback_) {

        var entities_ = [];

        var mysqlConnection_ = mysql.createConnection({

            host: process.env.USER_PW || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.USER_PW || "",
            database: process.env.DB_NAME || "furnace"

        });


        await mysqlConnection_.query("SELECT * FROM `company`", function (queryError_, rows_, fields) {

            if (queryError_) {

                console.log("--- ERROR IN QUERY: " + queryError_);

            } else {

                rows_.map(function (x_) {

                    var obj_ = {

                        id: x_.id,
                        type: "company",
                        name: x_.name,
                        document: x_.cnpj,
                        uf: getUfById(x_.uf),
                        is_legal_person: undefined

                    }


                    entities_.push(obj_);

                })

            }

            mysqlConnection_.query("SELECT * FROM `provider`", function (queryError_, rows_, fields) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                } else {

                    rows_.map(function (x_) {

                        var obj_ = {

                            id: x_.id,
                            type: "provider",
                            name: x_.name,
                            document: x_.document,
                            uf: undefined,
                            is_legal_person: (x_.is_legal_person == "1")

                        }

                        entities_.push(obj_);

                    })


                    mysqlConnection_.end();

                    callback_(entities_);

                }

            })

        })

    },

    async getEntityById(id_, type_, callback_) {

        var mysqlConnection_ = mysql.createConnection({

            host: process.env.USER_PW || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.USER_PW || "",
            database: process.env.DB_NAME || "furnace",
            dateStrings: true

        });


        if (type_ == "company") {

            mysqlConnection_.query("SELECT * FROM `company` WHERE id = '" + id_ + "'", function (queryError_, rows_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                } else {

                    var ent_ = rows_[0];

                    mysqlConnection_.end();

                    callback_({

                        id: ent_.id,
                        type: "company",
                        name: ent_.name,
                        document: ent_.cnpj,
                        uf: getUfById(ent_.uf),
                        email: "",
                        birthday: "",
                        is_legal_person: true

                    })

                }

            })

        } else if (type_ == "provider") {

            mysqlConnection_.query("SELECT * FROM `provider` WHERE id = '" + id_ + "'", function (queryError_, rows_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                } else {

                    var ent_ = rows_[0];

                    mysqlConnection_.end();

                    callback_({

                        id: ent_.id,
                        type: "provider",
                        name: ent_.name,
                        document: ent_.document,
                        uf: "",
                        email: ent_.email,
                        birthday: (ent_.birthday + "").split('-')[2] + "/" + (ent_.birthday + "").split('-')[1] + "/" + (ent_.birthday + "").split('-')[0],
                        is_legal_person: ent_.is_legal_person == "1" ? true : false

                    })

                }

            })

        }

    },

    async updateEntity(entity_, callback_) {

        var mysqlConnection_ = mysql.createConnection({

            host: process.env.USER_PW || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.USER_PW || "",
            database: process.env.DB_NAME || "furnace",
            dateStrings: true

        });

        if (entity_.type == "company") {

            mysqlConnection_.query("UPDATE `company` SET `name` = '" + entity_.name + "', `cnpj` = '" + entity_.document + "', `uf` = " + getIdByUf(entity_.uf) + " WHERE `company`.`id` = " + entity_.id, function (queryError_, rows_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                    mysqlConnection_.end();

                    callback_({

                        status: "0",
                        desc: "--- ERROR IN QUERY: " + queryError_,
                        data: entity_
                    })

                } else {

                    mysqlConnection_.end();

                    callback_({

                        status: "1",
                        desc: "company_data_has_been_updated",
                        data: entity_

                    })

                }

            })



        } else if (entity_.type == "provider") {

            mysqlConnection_.query("UPDATE `provider` SET `name` = '" + entity_.name + "', `document` = '" + entity_.document + "', `email` = '" + entity_.email + "', `is_legal_person` = '" + (entity_.is_legal_person ? "1" : "0") + "', `birthday` = '" + (entity_.birthday + "").split('/')[2] + "-" + (entity_.birthday + "").split('/')[1] + "-" + (entity_.birthday + "").split('/')[0] + "' WHERE `provider`.`id` = " + entity_.id, function (queryError_, rows_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                    mysqlConnection_.end();

                    callback_({

                        status: "0",
                        desc: "--- ERROR IN QUERY: " + queryError_,
                        data: entity_

                    })

                } else {

                    mysqlConnection_.end();

                    callback_({

                        status: "1",
                        desc: "company_data_has_been_updated",
                        data: entity_

                    })

                }

            })

        }

    },

    async deleteEntity(entity_, callback_) {

        var mysqlConnection_ = mysql.createConnection({

            host: process.env.USER_PW || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.USER_PW || "",
            database: process.env.DB_NAME || "furnace",
            dateStrings: true

        });

        if (entity_.type == "company") {

            mysqlConnection_.query("DELETE FROM `company` WHERE `company`.`id` =" + entity_.id, function (queryError_, rows_) {


                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                    mysqlConnection_.end();

                    callback_({

                        status: "0",
                        desc: "--- ERROR IN QUERY: " + queryError_,
                        data: entity_
                    })

                } else {

                    mysqlConnection_.end();

                    callback_({

                        status: "1",
                        desc: "company_data_has_been_deleted",
                        data: entity_

                    })

                }

            })



        } else if (entity_.type == "provider") {

            mysqlConnection_.query("DELETE FROM `provider` WHERE `provider`.`id` =" + entity_.id, function (queryError_, rows_) {

                if (queryError_) {

                    console.log("--- ERROR IN QUERY: " + queryError_);

                    mysqlConnection_.end();

                    callback_({

                        status: "0",
                        desc: "--- ERROR IN QUERY: " + queryError_,
                        data: entity_

                    })

                } else {

                    mysqlConnection_.end();

                    callback_({

                        status: "1",
                        desc: "company_data_has_been_deleted",
                        data: entity_

                    })

                }

            })

        }

        //"DELETE FROM `provider` WHERE `provider`.`id` = 1"

    }

}

exports.getEntitiesByName = function (name_) {

    entities_ = [];

    var mysqlConnection_ = mysql.createConnection({

        host: process.env.USER_PW || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.USER_PW || "",
        database: process.env.DB_NAME || "furnace"

    });

    mysqlConnection_.query()

}

getMysqlConnection = function () {

    var mysqlConnection_ = mysql.createConnection({

        host: process.env.USER_PW || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.USER_PW || "",
        database: process.env.DB_NAME || "furnace"

    })

    return mysqlConnection_;

}

getUfById = function (id_) {

    if (id_ == "1") {

        return "AC"

    } else if (id_ == "2") {

        return "AL"

    } else if (id_ == "3") {

        return "AM"

    } else if (id_ == "4") {

        return "AP"

    } else if (id_ == "5") {

        return "BA"

    } else if (id_ == "6") {

        return "CE"

    } else if (id_ == "7") {

        return "DF"

    } else if (id_ == "8") {

        return "ES"

    } else if (id_ == "9") {

        return "GO"

    } else if (id_ == "10") {

        return "MA"

    } else if (id_ == "11") {

        return "MG"

    } else if (id_ == "12") {

        return "MS"

    } else if (id_ == "13") {

        return "MT"

    } else if (id_ == "14") {

        return "PA"

    } else if (id_ == "15") {

        return "PB"

    } else if (id_ == "16") {

        return "PE"

    } else if (id_ == "17") {

        return "PI"

    } else if (id_ == "18") {

        return "PR"

    } else if (id_ == "19") {

        return "RJ"

    } else if (id_ == "20") {

        return "RN"

    } else if (id_ == "21") {

        return "RO"

    } else if (id_ == "22") {

        return "RR"

    } else if (id_ == "23") {

        return "RS"

    } else if (id_ == "24") {

        return "SC"

    } else if (id_ == "25") {

        return "SE"

    } else if (id_ == "26") {

        return "SP"

    } else if (id_ == "27") {

        return "TO"

    }

}

getIdByUf = function (uf_) {

    if (uf_ == "AC") {

        return "1"

    } else if (uf_ == "AL") {

        return "2"

    } else if (uf_ == "AM") {

        return "3"

    } else if (uf_ == "AP") {

        return "4"

    } else if (uf_ == "BA") {

        return "5"

    } else if (uf_ == "CE") {

        return "6"

    } else if (uf_ == "DF") {

        return "7"

    } else if (uf_ == "ES") {

        return "8"

    } else if (uf_ == "GO") {

        return "9"

    } else if (uf_ == "MA") {

        return "10"

    } else if (uf_ == "MG") {

        return "11"

    } else if (uf_ == "MS") {

        return "12"

    } else if (uf_ == "MT") {

        return "13"

    } else if (uf_ == "PA") {

        return "14"

    } else if (uf_ == "PB") {

        return "15"

    } else if (uf_ == "PE") {

        return "16"

    } else if (uf_ == "PI") {

        return "17"

    } else if (uf_ == "PR") {

        return "18"

    } else if (uf_ == "RJ") {

        return "19"

    } else if (uf_ == "RN") {

        return "20"

    } else if (uf_ == "RO") {

        return "21"

    } else if (uf_ == "RR") {

        return "22"

    } else if (uf_ == "RS") {

        return "23"

    } else if (uf_ == "SC") {

        return "24"

    } else if (uf_ == "SE") {

        return "25"

    } else if (uf_ == "SP") {

        return "26"

    } else if (uf_ == "TO") {

        return "27"

    }

}