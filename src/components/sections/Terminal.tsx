export function Terminal() {
  return (
    <div className="terminal">
      <div className="tbar">
        <div className="tdot" />
        <div className="tdot" />
        <div className="tdot" />
        <span className="ttitle">engineer.profile.ts</span>
      </div>
      <div className="tbody">
        <div className="tl">
          <span className="tp">$</span> ts-node profile.ts
        </div>
        <div className="tl">&nbsp;</div>
        <div className="tl">
          <span className="tb">{"{"}</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">role</span>
          <span className="tb">:</span> <span className="ts">"Backend Software Engineer"</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">experience</span>
          <span className="tb">:</span> <span className="ts">"2+ years"</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">microservices</span>
          <span className="tb">:</span> <span className="tn">8</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">latencyReduction</span>
          <span className="tb">:</span> <span className="ts">"~30%"</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">testCoverage</span>
          <span className="tb">:</span> <span className="ts">"85%+"</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">stack</span>
          <span className="tb">: [</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="ts">"Node.js"</span>
          <span className="tb">,</span> <span className="ts">"TypeScript"</span>
          <span className="tb">,</span> <span className="ts">"RabbitMQ"</span>
          <span className="tb">,</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="ts">"Redis"</span>
          <span className="tb">,</span> <span className="ts">"AWS"</span>
          <span className="tb">,</span> <span className="ts">"PostgreSQL"</span>
          <span className="tb">,</span> <span className="ts">"Docker"</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tb">],</span>
        </div>
        <div className="tl">
          &nbsp;&nbsp;<span className="tk">status</span>
          <span className="tb">:</span>{" "}
          <span style={{ color: "var(--color-paccent)" }}>"open_to_work"</span>
        </div>
        <div className="tl">
          <span className="tb">{"}"}</span>
        </div>
        <div className="tl">&nbsp;</div>
        <div className="tl">
          <span className="tp">$</span> <span className="tcur" />
        </div>
      </div>
    </div>
  );
}
