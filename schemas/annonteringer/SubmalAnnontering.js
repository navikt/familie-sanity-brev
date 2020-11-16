import styles from "../../styles/myStyling.css";
import React, { useEffect, useState } from "react";
import hentFeltFraRemote from "./hentFeltFraRemote";

const SubmalRenderer = (props) => {
  const feltId = props.submal?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [submal, setFelt] = useState(
    cachedHits ? JSON.parse(cachedHits)["id"] : "LASTER DELMAL"
  );

  useEffect(() => {
    if (props.submal) {
      hentFeltFraRemote(feltId, "id").then((submal) => setFelt(submal));
    } else {
      setFelt("TOMT SUBMALFELT");
    }
  }, []);

  return (
    <span className={styles.submal}>
      {props.children}({submal})
    </span>
  );
};

export default {
  name: "submal",
  type: "object",
  title: "Delmal",
  blockEditor: {
    icon: () => <span className={styles.submalIcon}>D</span>,
    render: SubmalRenderer,
  },
  fields: [
    {
      name: "submal",
      type: "reference",
      to: [{ type: "delmal" }],
      validation: (Rule) => [Rule.required().error("Tom delmal")],
    },
    {
      title: "Skal med dersom:",
      name: "skalMedFelt",
      type: "reference",
      description: "Delmalen kommer alltid med dersom dette feltet er tomt",
      to: [{ type: "skalMedDersomFelt" }],
    },
  ],
};
