const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../utils");
const cfg = require("../");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig:  configLib.setTSParser(
        configLib.mockImports(cfg, "ts")
    ),
});

describe("TypeScript integration tests:", () => {
    it("Global config with TS should lint with errors", async () => {
        const report = await eslint.lintText(`
        import { getSmth } from "./lib"; // import-order
        import axios from "axios";
        import { data } from "../fixtures"; // import-order
        import { authModel } from "entities/auth"; // import-order
        import { Button } from "shared/ui"; // import-order
        import { LoginForm } from "features/login-form"; // import-order
        import { Header } from "widgets/header"; // import-order, import-boundaries
        import { debounce } from "shared/lib/fp"; // import-order
        import { AuthPage } from "pages/auth"; // import-boundaries
        import { IssueDetails } from "widgets/issue-details/ui/details"; // import-order, publicAPI
        
        interface IConfig {
            path: string;
        };
        
        const configs: Array<IConfig> = [];
        `, {
            filePath: "src/widgets/mock/index.ts",
        });

        assert.strictEqual(report[0].errorCount, 11);
    });

    it("Global config with TS should lint without errors", async () => {
        const report = await eslint.lintText(`
        import { getRoute } from "pages/auth";
        import { Header } from "widgets/header";
        import { LoginForm } from "features/login-form";
        import { Phone } from "features/login-form/phone";
        import { Article } from "entities/article";
        import { LoginAPI } from "shared/api";
        import { Button } from "shared/ui/button";
        import { model } from "../model";
        import { styles } from "./styles.module.scss";
        
        interface IConfig {
            path: string;
        };
        
        const configs: Array<IConfig> = [];
        `, { filePath: "src/appLayer/ui/index.ts" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Global config with TS should lint only with import-order error", async () => {
        const report = await eslint.lintText(`
        import { LoginAPI } from "shared/api";
        import { getRoute } from "pages/auth";
        const configs: Array<string> = [];
        `, { filePath: "src/appLayer/ui/index.ts" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config with TS should lint only with layer error", async () => {
        const report = await eslint.lintText(`
        import { LoginForm } from "features/login-form";
        const configs: Array<string> = [];
        `, { filePath: "src/entities/ui/index.ts" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config with TS should lint only with slice error", async () => {
        const report = await eslint.lintText(`
        import { Article } from "entities/article";
        const configs: Array<string> = [];
        `, { filePath: "src/entities/avatar/ui/index.ts" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config with TS should lint only with PublicAPI error", async () => {
        const report = await eslint.lintText(`
        import { orderModel } from "entities/order/model";
        const configs: Array<string> = [];
        `, { filePath: "src/features/profile/ui/index.ts" });

        assert.strictEqual(report[0].errorCount, 1);
    });
});
