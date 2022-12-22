import message from "../constant/message";
import responseMessage from "../helper/responseMessage";
import StatusBotModel from "../models/StatusbotModel";
import QueueModel from "../models/QueueModel";
import line from "../lib/line";
import utils from "../utils/utils";

export const find = async (req, res) => {
  try {
    const { company_code } = req.fields;
    let query = StatusBotModel.find({});
    if (company_code) {
      query.where({ company_code: company_code });
    }
    const bot = await query;
    return res.json(
      responseMessage.responseSuccess(message.FIND_DATA_SUCCESS, bot)
    );
  } catch (error) {
    return res.json(responseMessage.responseError(message.ERROR_MESSAGE));
  }
};
export const create = async (req, res) => {
  try {
    const { company_code, bot_status, website } = req.fields;
    let checkbot = await StatusBotModel.findOne({
      company_code: company_code,
    });
    if (checkbot) {
      return res.json(responseMessage.responseError(message.DUPLICATE));
    }
    const data = {
      bot_status: bot_status,
      company_code: company_code,
      website: website,
    };
    await StatusBotModel.insertMany(data);
    return res.json(responseMessage.responseSuccess(message.INSERT_SUCCESS));
  } catch (error) {
    return res.json(responseMessage.responseError(message.ERROR_MESSAGE));
  }
};
export const update = async (req, res) => {
  try {
    const { company_code, bot_status, website } = req.fields;
    const data = {
      bot_status: bot_status,
      website: website,
    };
    await StatusBotModel.findOneAndUpdate(
      { company_code: company_code },
      {
        $set: data,
      },
      {
        upsert: true,
        returnDocument: "after", // this is new !
      }
    );
    responseMessage.logMessage(
      `${message.STATUS_BOT} ${bot_status} ${message.SUCCESS}`
    );

    if (bot_status == message.ON) {
      const msg = "Demo";
      line.notyMessage(msg);
    }
    return res.json(responseMessage.responseSuccess(message.UPDATE_SUCCESS));
  } catch (error) {
    console.log(error);
    return res.json(
      responseMessage.responseError(message.ERROR_MESSAGE, error)
    );
  }
}; 
export default {
  create,
  update,
  find, 
};
