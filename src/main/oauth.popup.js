import OauthPopup from "react-oauth-popup";

export default function()
{
    return (
        <OauthPopup
          url="http://FriendlyMultiNationalTechConglomerate.com"
          onCode={onCode}
          onClose={onClose}
        >
          <div>Click me to open a Popup</div>
        </OauthPopup>
        );
}