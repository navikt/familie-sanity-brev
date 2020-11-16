import styles from "../../styles/myStyling.css";
import React, { useEffect, useState } from "react";
import hentFeltFraRemote from "./hentFeltFraRemote";

const SubmalRenderer = (props) => {
  const feltId = props.valgfelt?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [felt, settFelt] = useState(
    cachedHits ? JSON.parse(cachedHits)["tittel"] : "LASTER VALGFELT"
  );

  useEffect(() => {
    if (props.valgfelt) {
      hentFeltFraRemote(feltId, "tittel").then((felt) => settFelt(felt));
    } else {
      settFelt("TOMT VALGFELT");
    }
  }, []);

  return (
    <span className={styles.valgfelt}>
      {props.children}(Valg basert på {felt})
    </span>
  );
};

export default {
  name: "valgfelt",
  type: "object",
  title: "Valgfelt",
  blockEditor: {
    icon: () => <span className={styles.valgfeltIcon}>V</span>,
    render: SubmalRenderer,
  },
  fields: [
    {
      name: "valgfelt",
      type: "reference",
      to: [{ type: "valgfelt" }],
      validation: (Rule) => [Rule.required().error("Tomt valgfelt")],
    },
  ],
};
