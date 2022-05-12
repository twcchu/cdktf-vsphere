import { App, RemoteBackend, TerraformStack } from "cdktf";
import { MyStack } from "./stack";
// import * as rl from "readline-sync";

// let un = rl.question("vSphere username: ");
// let pw = rl.question("vSphere password: ", {
//   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });

class CdktfVsphereApp extends App {

  private readonly _stack: TerraformStack;

  constructor() {
    super();

    // const username = this.node.tryGetContext('un');
    // if (!username) {
    //   throw new Error('Username is a required parameter. Specify it with `-c un=XYZ`.');
    // }
    // console.log(username);

    // const password = this.node.tryGetContext('pw');
    // if (!password) {
    //   throw new Error('Password is a required parameter. Specify it with `-c pw=XYZ`.');
    // }

    // this._stack = new MyStack(this, "cdktf-vsphere", {
    //   user: un,
    //   password: pw,
    // });
    // this._stack = new MyStack(this, "cdktf-vsphere", {
    //   user: process.env["VSPHERE_USER"] || "tchu",
    //   password: process.env["VSPHERE_PASSWORD"] || "",
    // });
    this._stack = new MyStack(this, "cdktf-vsphere");
  }

  public getStack(): TerraformStack {
    return this._stack;
  }
}

const app = new CdktfVsphereApp();
// const app = new App();
// new MyStack(app, "cdktf-vsphere");
// new MyStack(app, "cdktf-vsphere", {
//   user: un,
//   password: pw,
// });
new RemoteBackend(app.getStack(), {
  hostname: "app.terraform.io",
  organization: "bw-systems",
  workspaces: {
    name: "cdktf-vsphere"
  },
});
app.synth();