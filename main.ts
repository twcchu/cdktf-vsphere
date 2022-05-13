import { App, TerraformStack } from "cdktf";
import { MyStack } from "./stack";
import { vSphereCredentials } from "./configs";

class CdktfVsphereApp extends App {

  private readonly _stack: TerraformStack;

  constructor() {
    super();

    this._stack = new MyStack(this, "cdktf-vsphere", {
      user: vSphereCredentials.username,
      password: vSphereCredentials.password,
    });
  }

  public getStack(): TerraformStack {
    return this._stack;
  }
}

const app = new CdktfVsphereApp();
// new RemoteBackend(app.getStack(), {
//   hostname: "app.terraform.io",
//   organization: "bw-systems",
//   workspaces: {
//     name: "cdktf-vsphere"
//   },
// });
app.synth();