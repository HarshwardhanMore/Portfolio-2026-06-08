import { type ReactNode } from "react";

export function Terminal(): ReactNode {
  return (
    <div className="terminal">
      <div className="tbar">
        <div className="tdot" />
        <div className="tdot" />
        <div className="tdot" />
        <div className="ttitle">zsh — node</div>
      </div>
      <div className="tbody">
        <div className="tl">
          <span className="tp">➜</span> <span className="tk">portfolio</span>{" "}
          <span className="ts">git:(</span>
          <span className="tk">main</span>
          <span className="ts">)</span> <span className="tp">✗</span> npm run dev
        </div>
        <div className="tl">
          <span className="tb">ready</span> - started server on 0.0.0.0:3000, url:
          http://localhost:3000
        </div>
        <div className="tl">
          <span className="tb">event</span> - compiled successfully
        </div>
        <div className="tl">
          <span className="tp">➜</span> <span className="tk">portfolio</span>{" "}
          <span className="ts">git:(</span>
          <span className="tk">main</span>
          <span className="ts">)</span> <span className="tp">✗</span>{" "}
          <span className="tn">node</span> stats.js
        </div>
        <div className="tl">
          <span className="tb">Calculating productivity...</span>
        </div>
        <div className="tl">
          [<span className="tk">##########</span>] 100%
        </div>
        <div className="tl">
          <span className="tp">Result:</span> 99.9% Backend stability achieved.
        </div>
        <div className="tl">
          <span className="tp">➜</span> <span className="tk">portfolio</span>{" "}
          <span className="ts">git:(</span>
          <span className="tk">main</span>
          <span className="ts">)</span> <span className="tp">✗</span>{" "}
          <span className="tcur" />
        </div>
      </div>
    </div>
  );
}
