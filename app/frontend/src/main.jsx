import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
function App() {
  const [health, setHealth] = React.useState("Checking API…");
  const [items, setItems] = React.useState([]);
  const [itemsState, setItemsState] = React.useState("Loading sample data…");
  React.useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/health`).then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { if (!cancelled) setHealth(data.status === "ok" ? "Operational" : "Unknown"); })
      .catch(() => { if (!cancelled) setHealth("Unavailable"); });
    fetch(`${apiBase}/api/v1/items`).then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { if (!cancelled) { setItems(data.items || []); setItemsState(data.items?.length ? "Connected to the data tier" : "Connected; no records yet"); } })
      .catch(() => { if (!cancelled) setItemsState("Data tier not ready"); });
    return () => { cancelled = true; };
  }, []);
  return <main className="shell">
    <nav className="nav"><div className="brand"><span className="brand-mark">C</span><span>CloudOps <b>Console</b></span></div><span className="environment"><i /> DEV ENVIRONMENT</span></nav>
    <section className="hero"><p className="eyebrow">THREE-TIER PLATFORM · AWS EKS</p><h1>Ship securely.<br/><span>Operate confidently.</span></h1><p className="intro">A practical DevSecOps playground connecting the user interface, API services, and data tier through secure delivery practices.</p><div className="actions"><a className="primary" href="https://github.com/shaikghb/aws-eks-three-tier-devsecops" target="_blank" rel="noreferrer">Explore repository <span>↗</span></a><a className="secondary" href={`${apiBase}/health`} target="_blank" rel="noreferrer">View API health</a></div></section>
    <section className="section-heading"><div><p className="eyebrow">PLATFORM OVERVIEW</p><h2>Service status</h2></div><span className="live"><i /> LIVE CHECKS</span></section>
    <section className="cards">
      <article className="card"><div className="card-top"><span className="symbol violet">UI</span><span className="status-pill">TIER 01</span></div><h3>Frontend</h3><p>React interface delivered as static assets.</p><div className="metric">Vite <span>· Nginx container</span></div></article>
      <article className="card"><div className="card-top"><span className="symbol blue">API</span><span className="status-pill">TIER 02</span></div><h3>Backend API</h3><p>Express endpoints with security headers.</p><div className="metric"><i className={health === "Operational" ? "dot green" : "dot amber"} />{health}</div></article>
      <article className="card"><div className="card-top"><span className="symbol orange">DB</span><span className="status-pill">TIER 03</span></div><h3>Data tier</h3><p>PostgreSQL locally; RDS is planned.</p><div className="metric">{itemsState}</div></article>
    </section>
    <section className="data-panel"><div className="panel-title"><div><p className="eyebrow">DATABASE DEMO</p><h2>Service items</h2></div><span className="count">{items.length} RECORDS</span></div>{items.length ? <div className="items">{items.map((item) => <article className="item" key={item.id}><span className="item-id">#{item.id}</span><div><b>{item.name}</b><p>{item.description}</p></div></article>)}</div> : <p className="empty">{itemsState}. Start the local Docker Compose stack to load the sample record.</p>}</section>
    <footer><span>CloudOps Console <b>· DevSecOps learning project</b></span><span>Built for secure-by-default delivery</span></footer>
  </main>;
}
createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
