import React, { useState, useContext, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import { useTranslation } from "react-i18next";
import { Language } from "../../Context";
import useApi from "../../hooks/useApi";

import "./pieChart.css";

const PieChartClass = () => {
  const { t } = useTranslation();
  const { LanguageUse } = useContext(Language);
  const [Hover, setHover] = useState("out");
  const { api } = useApi();

  const [companies, setCompaniesAmount] = useState(null);
  const [partner, setPartnerAmount] = useState(null);
  const [team, setTeamAmount] = useState(null);
  const [burn, setBurnAmount] = useState(null);
  const [investors, setInvestorsAmount] = useState(null);
  const [liquidity, setLiquidityAmount] = useState(null);

  const [chartOptions, setChartOptions] = useState(null);

  const handlerMouseLeave = () => {
    setHover("out");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: false,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: false,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: false,
            },
            {
              name: "team",
              y: team * 1,
              selected: false,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: false,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: false,
            },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    if (api && api.bsc != null) {
      setCompaniesAmount(api.bsc.companies);
      setPartnerAmount(api.bsc.partner);
      setTeamAmount(api.bsc.team);
      setBurnAmount(api.bsc.burn);
      setInvestorsAmount(api.bsc.investors);
      setLiquidityAmount(api.bsc.liquidity);
    }
  }, [api]);

  useEffect(() => {
    setChartOptions({
      chart: {
        height: 350,
        width: 350,
        type: "pie",
        style: {
          fontFamily: "new-hero",
        },
      },
      legend: {
        align: "left",
        floating: true,
        backgroundColor: "red",
        verticalAlign: "middle",
        style: {
          zindex: 50,
          position: "absolute",
        },
        x: -90,
      },
      title: {
        text: "20 M",
        align: "center",
        verticalAlign: "middle",
        y: 35,
        style: {
          wordSpacing: -10,
          fontWeight: "bold",
          fontSize: 40,
          color: "#1D202D",
        },
      },
      subtitle: {
        text: "IMO",
        align: "center",
        verticalAlign: "middle",
        style: {
          fontWeight: "500",
          fontSize: 22,
          color: "#1D202D",
          opacity: 0.5,
        },
        y: 55,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          borderWidth: 3,
          slicedOffset: 10,
          innerSize: "98%",
          ignoreHiddenPoint: false,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
              inactive: {
                opacity: 1,
              },
              normal: {
                enabled: true,
                brightness: 1,
                opacity: 1,
                animation: false,
              },
              select: {
                enabled: false,
              },
            },
          },
          shadow: false,
          dataLabels: {
            enabled: false,
          },

          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            },
            normal: {
              enabled: true,
              brightness: 1,
              opacity: 1,
              animation: false,
            },
            select: {
              enabled: false,
            },
          },
        },
        series: {
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            },
            normal: {
              enabled: true,
              brightness: 1,
              opacity: 1,
              animation: false,
            },
            select: {
              enabled: false,
            },
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          enableMouseTracking: true,
          showInLegend: false,
          states: {
            hover: {
              enabled: true,
              halo: {
                size: 15,
              },
            },
            inactive: {
              enabled: true,
              color: "black",
              opacity: 0.1,
            },
            normal: {
              enabled: true,
              brightness: 1,
              opacity: 1,
              animation: false,
            },
            select: {
              color: "black",
              opacity: 0.3,
              enabled: true,
            },
          },
          name: "",

          point: {
            events: {
              mouseOver: function () {
                random(this.name);
                /* handlerMouseLeave()
                                   if (this.name === 'investors') {
                                        handlerMouseOverInv()
                                   }
                                   if (this.name === 'companies') {
                                        handlerMouseOverCom()
                                   }
                                   if (this.name === 'liquidity') {
                                        handlerMouseOverLiq()
                                   }
                                   if (this.name === 'team') {
                                        handlerMouseOverTeam()
                                   }
                                   if (this.name === 'partner') {
                                        handlerMouseOverPar()
                                   }
                                   if (this.name === 'burn') {
                                        handlerMouseOverBurn()
                                   }*/
              },
              mouseOut: function () {
                /*setchartOptions({
                                        series: [
                                             {
                                                  enableMouseTracking: false,
                                             },
                                        ],
                                   })
                                   console.log('test')
                                   handlerMouseLeave()*/
              },
            },
          },
          events: {
            mouseOut: function () {
              handlerMouseLeave();
            },
          },

          data: [
            {
              name: "investors",
              y: investors / 1,
            },
            {
              name: "companies",
              y: companies / 1,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
            },
            {
              name: "team",
              y: team * 1,
            },
            {
              name: "partner",
              y: partner * 1,
            },
            {
              name: "burn",
              y: burn * 1,
            },
          ],
          size: "95%",
          innerSize: "70%",
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 100,
            },
            chartOptions: {
              series: [
                {},
                {
                  id: "versions",
                  dataLabels: {
                    enabled: false,
                  },
                },
              ],
            },
          },
        ],
      },
    });
  }, [burn, partner, team, liquidity, investors, companies]);

  Highcharts.setOptions({
    colors: ["#1D202D", "#383951", "#585972", "#9A9BB9", "#CFD1F5", "#E6E8FF"],
  });

  const formatter = new Intl.NumberFormat("en");

  const random = (point) => {
    setHover(point);
  };

  const handlerMouseOverInv = () => {
    setHover("investors");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: false,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: true,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: true,
            },
            {
              name: "team",
              y: team * 1,
              selected: true,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: true,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: true,
            },
          ],
        },
      ],
    });
  };
  const handlerMouseOverCom = () => {
    setHover("companies");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: true,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: false,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: true,
            },
            {
              name: "team",
              y: team * 1,
              selected: true,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: true,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: true,
            },
          ],
        },
      ],
    });
  };
  const handlerMouseOverLiq = () => {
    setHover("liquidity");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: true,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: true,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: false,
            },
            {
              name: "team",
              y: team * 1,
              selected: true,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: true,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: true,
            },
          ],
        },
      ],
    });
  };
  const handlerMouseOverTeam = () => {
    setHover("team");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: true,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: true,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: true,
            },
            {
              name: "team",
              y: team * 1,
              selected: false,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: true,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: true,
            },
          ],
        },
      ],
    });
  };
  const handlerMouseOverPar = () => {
    setHover("partner");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: true,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: true,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: true,
            },
            {
              name: "team",
              y: team * 1,
              selected: true,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: false,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: true,
            },
          ],
        },
      ],
    });
  };
  const handlerMouseOverBurn = () => {
    setHover("burn");
    setChartOptions({
      series: [
        {
          data: [
            {
              name: "investors",
              y: investors / 1,
              selected: true,
            },
            {
              name: "companies",
              y: companies / 1,
              selected: true,
            },
            {
              name: "liquidity",
              y: liquidity * 1,
              selected: true,
            },
            {
              name: "team",
              y: team * 1,
              selected: true,
            },
            {
              name: "partner",
              y: partner * 1,
              selected: true,
            },
            {
              name: "burn",
              y: burn * 1,
              selected: false,
            },
          ],
        },
      ],
    });
  };

  return (
    <div className="pieChart">
      <div className="pieChartContainer">
        <div className="pieChartTitle">{t("Tokenomics")}</div>
        <div className="pieChartChart">
          <div className="pieChartChartLeft">
            <div className="pieChartChartLeftList">
              <div
                className={
                  Hover === "investors" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverInv}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #1D202D" }}
                >
                  {t("Investors")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(investors)
                    : formatter
                      .format(investors)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
              <div
                className="pieChartChartLeftItemLine"
                onMouseOver={handlerMouseOverInv}
                onMouseLeave={handlerMouseLeave}
              ></div>
              <div
                className={
                  Hover === "companies" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverCom}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #383951" }}
                >
                  {t("Company")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(companies)
                    : formatter
                      .format(companies)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
              <div
                className="pieChartChartLeftItemLine"
                onMouseOver={handlerMouseOverCom}
                onMouseLeave={handlerMouseLeave}
              ></div>
              <div
                className={
                  Hover === "liquidity" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverLiq}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #585972" }}
                >
                  {t("Remaining")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(liquidity)
                    : formatter
                      .format(liquidity)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
              <div
                className="pieChartChartLeftItemLine"
                onMouseOver={handlerMouseOverLiq}
                onMouseLeave={handlerMouseLeave}
              ></div>
              <div
                className={
                  Hover === "team" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverTeam}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #9A9BB9" }}
                >
                  {t("TeamPie")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(team)
                    : formatter
                      .format(team)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
              <div
                className="pieChartChartLeftItemLine"
                onMouseOver={handlerMouseOverTeam}
                onMouseLeave={handlerMouseLeave}
              ></div>
              <div
                className={
                  Hover === "partner" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverPar}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #CFD1F5" }}
                >
                  {t("Strategic")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(partner)
                    : formatter
                      .format(partner)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
              <div
                className="pieChartChartLeftItemLine"
                onMouseOver={handlerMouseOverPar}
                onMouseLeave={handlerMouseLeave}
              ></div>
              <div
                className={
                  Hover === "burn" || Hover === "out"
                    ? "pieChartChartLeftItem"
                    : "pieChartChartLeftItemNone"
                }
                onMouseOver={handlerMouseOverBurn}
                onMouseLeave={handlerMouseLeave}
              >
                <div
                  className="pieChartChartLeftItemTitle"
                  style={{ borderLeft: "solid 4px #E6E8FF" }}
                >
                  {t("Burned")}
                </div>
                <div className="pieChartChartLeftItemValue">
                  {LanguageUse === "en"
                    ? formatter.format(burn)
                    : formatter
                      .format(burn)
                      .replace(",", "'")
                      .replace(",", "'")
                      .replace(",", "'")}
                </div>
              </div>
            </div>
          </div>
          <div className="pieChartChartRight">
            <PieChart
              highcharts={Highcharts}
              options={chartOptions}
              updateArgs={[true]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartClass;
