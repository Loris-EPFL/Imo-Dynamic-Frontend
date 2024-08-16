import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as IMOIcon } from "../../Icons/IMOIcon.svg";
import { ReactComponent as MarketIcon } from "../../Icons/MarketIcon.svg";
import { ReactComponent as CirculatingIcon } from "../../Icons/CirculatingIcon.svg";
import { ReactComponent as Burned } from "../../Icons/Burned.svg";
import { Language } from "../../Context";
import useApi from "../../hooks/useApi";

import "./dataScience.css";
import number_format from "../../scripts/util";
import SupplyChart from "../SupplyChart/SupplyChart";

const DataScience = () => {
  const { LanguageUse } = useContext(Language);
  const { t } = useTranslation();
  const { api } = useApi();
  const handlerExplore = () => {
    if (LanguageUse === "en") {
      window.open("https://www.coingecko.com/en/coins/imo");
    } else {
      window.open("https://www.coingecko.com/fr/pièces/imo");
    }
  };

  return (
    <div className="dataScience">
      <div className="dataScienceContainer">
        <div className="dataScienceTitle">{t("DataTitle")}</div>
        <div className="dataScienceList">
          <div className="dataScienceItem">
            <IMOIcon className="dataScienceItemIcon" />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">IMO ($IMO)</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && (api.cg.market_data.current_price.usd).toFixed(3)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">$US</div>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <MarketIcon />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("Marketcap")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.cg.market_data.market_cap.usd)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">$US</div>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <CirculatingIcon />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("CIRCULATING")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.cg.market_data.circulating_supply)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                {"  /   "}
                <span>
                  {api && number_format(Math.trunc(api.cg.market_data.total_supply))}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <Burned />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("Burntoken")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.bsc.burn)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">IMO</div>
              </div>
            </div>
          </div>
        </div>

        {/* <SupplyChart/> */}
        
        <div className="dataScienceButton">
          <div className="button" onClick={handlerExplore}>
            {t("Explore")}
          </div>
        </div>
      </div>

      {/* <div className='box' style={{ display: 'flex' }}>
                    <div className='title'>IMO(IMO)</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='price'></span>$US
                         <span imo='price-change-percentage-24h'></span>
                    </div>
                    <div className='title'> Trade volume</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='total-volume'></span>$US
                    </div>
                    <div className='title'> Circulating offer</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='circulating-supply'></span> / <span imo='total-supply'></span>
                    </div>
                    <div className='title'> Jetons brulés</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='burn'></span>
                    </div>
                    <div className='title'> ATH:</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='ath'></span>$US
                    </div>
                    <div className='title'> ATL:</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='atl'></span>$US
                    </div>
               </div> */}
    </div>
  );
};

export default DataScience;
