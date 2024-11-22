module.exports = {
  populateBotResponse: function (
    vbResponse,
    responseId,
    entityStatus,
    failedEntity
  ) {
    const verbiage_builder_resp = vbResponse;
    let orderIdInput = "";
    let result = verbiage_builder_resp.filter(
      (ele) => ele.RESPONSE_ID === responseId
    );
    //hook to add custom events
    switch (responseId) {
      case "ESI_PHA_ORD_INFO_ASK_ORD_TITLE":
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_CNFN_MSG":
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_ASK_ORD_ID":
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_ORD_ID_RESP":
        orderIdInput = entityStatus;

        let str = result[0].WEB_RESPONSE_MSG.replaceAll(
          "${order_status}",
          orderIdInput
        );
        result[0].WEB_RESPONSE_MSG = str;
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_ORD_FALLBACK":
        return msgTemplate(result);
      case "ESI_PHA_ORD_INFO_ASK_MEMBER_ID":
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_CNFN_ERROR_MSG":
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_MEMBER_ID_RESP":
        let memberIdInput = entityStatus;
        let memberStr = result[0].WEB_RESPONSE_MSG.replaceAll(
          "${member_status}",
          memberIdInput
        );
        result[0].WEB_RESPONSE_MSG = memberStr;
        return msgTemplate(result);

      case "ESI_PHA_ORD_INFO_INVALID_MSG":
        // let failedEntityInput = failedEntity === "OrderId" ? "Order Id" : "Member Id";
        if (failedEntity !== null) {
          let failedEntityInputStr =
            failedEntity === "Order Id"
              ? result[0].WEB_RESPONSE_MSG.replaceAll(
                  "${dynamic_entity}",
                  failedEntity
                )
              : result[0].WEB_RESPONSE_MSG.replaceAll(
                  "${dynamic_entity}",
                  failedEntity
                );
          result[0].WEB_RESPONSE_MSG = failedEntityInputStr;
          return msgTemplate(result);
        }

      case "ESI_PHA_ORD_INFO_MAX_NO_ATTEMPTS_MSG":
        return msgTemplate(result);

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
