module.exports = {
  populateBotResponse: function (
    vbResponse,
    responseId,
    messageDataWithBotUserSession
  ) {
    const verbiage_builder_resp = vbResponse;
    let entityStatus = messageDataWithBotUserSession.entity_status;
     let failedEntity = messageDataWithBotUserSession.failedEntity;
    let orderIdInput = "";
    let result = verbiage_builder_resp.filter(
      (ele) => ele.RESPONSE_ID === responseId
    );
    let temp = [];
    //hook to add custom events
    switch (responseId) {
      case "ESI_PHA_ORD_INFO_ASK_ORD_TITLE":
        temp.push(result);
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_CNFN_MSG":
        temp.push(result);
        return msgTemplate(temp);
        
      case "ESI_PHA_ORD_INFO_ASK_ORD_ID":
        temp.push(result);
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_ORD_ID_RESP":
        orderIdInput = entityStatus;
         temp.push(result);
        let str = temp[0].WEB_RESPONSE_MSG.replaceAll(
          "${order_status}",
          orderIdInput
        );
        temp[0].WEB_RESPONSE_MSG = str;
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_ORD_FALLBACK":
        temp.push(result);
        return msgTemplate(temp);
      case "ESI_PHA_ORD_INFO_ASK_MEMBER_ID":
        temp.push(result);
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_CNFN_ERROR_MSG":
        temp.push(result);
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_MEMBER_ID_RESP":
        let memberIdInput = entityStatus;
        temp.push(result);
        let memberStr = temp[0].WEB_RESPONSE_MSG.replaceAll(
          "${member_status}",
          memberIdInput
        );
         temp[0].WEB_RESPONSE_MSG = memberStr;
        return msgTemplate(temp);

      case "ESI_PHA_ORD_INFO_INVALID_MSG":
        // let failedEntityInput = failedEntity === "OrderId" ? "Order Id" : "Member Id";
        if (failedEntity !== null) {
          temp.push(result);
          let failedEntityInputStr =
            failedEntity === "Order Id"
              ? temp[0].WEB_RESPONSE_MSG.replaceAll(
                  "${dynamic_entity}",
                  failedEntity
                )
              : temp[0].WEB_RESPONSE_MSG.replaceAll(
                  "${dynamic_entity}",
                  failedEntity
                );
          temp[0].WEB_RESPONSE_MSG = failedEntityInputStr;
          return msgTemplate(temp);
        }

      case "ESI_PHA_ORD_INFO_MAX_NO_ATTEMPTS_MSG":
          temp.push(result);
        return msgTemplate(temp);

      default:
        return responseId;
    }
  },
};
function msgTemplate(templateData) {
  const templateType = templateData[0]?.MEDIA_TYPE;
  const tableTemplate = templateData[0]?.DATA
    ? [
        {
          type: "text",
          component: {
            type: "template",
            payload: {
              template_type: "table",
              ...JSON.parse(templateData[0]?.DATA),
            },
          },
          cInfo: {
            body: "Account details",
          },
        },
      ]
    : null;

  const dafaultTextTemplate = templateData[0]?.WEB_RESPONSE_MSG;

  switch (templateType) {
    case "TABLE":
      return tableTemplate;

    default:
      return dafaultTextTemplate;
  }
}
