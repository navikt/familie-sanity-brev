import styles from "../../styles/myStyling.css";
import React, { useEffect, useState } from "react";
import hentFeltFraRemote from "./hentFeltFraRemote";

const FlettefeltRenderer = (props) => {
  const feltId = props.felt?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [felt, setFelt] = useState(
    cachedHits ? JSON.parse(cachedHits)["felt"] : "LASTER FLETTEFELT"
  );

  useEffect(() => {
    if (props.felt) {
      hentFeltFraRemote(feltId, "felt").then((felt) => setFelt(felt));
    } else {
      setFelt("TOMT FLETTEFELT");
    }
  }, []);

  return (
    <span className={styles.flettefelt}>
      {props.children}({felt})
    </span>
  );
};

export default {
  name: "flettefelt",
  type: "object",
  title: "Flettefelt",
  blockEditor: {
    icon: () => <span className={styles.flettefeltIcon}>F</span>,
    render: (props) => (
      <span className={styles.flettefelt}>{props.children}</span>
    ),
  },
  fields: [
    {
      name: "felt",
      type: "reference",
      to: [{ type: "flettefelt" }],
      validation: (Rule) => [Rule.required().error("Tomt flettefelt")],
    },
  ],
};
