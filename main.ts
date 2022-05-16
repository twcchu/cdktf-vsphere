import { App, TerraformStack } from "cdktf";
import { MyStack } from "./stack";
import * as configs from "./configs";

class CdktfVsphereApp extends App {

  private readonly _stack: TerraformStack;

  constructor() {
    super();

    this._stack = new MyStack(this, "cdktf-vsphere", {
      user: configs.userConfigs.username,
      password: configs.userConfigs.password,
      datacenter: configs.labEnvInfo.datacenter,
      datastoreCluster: configs.labEnvInfo.datastoreCluster,
      network: configs.labEnvInfo.network,
      rp_name: configs.userConfigs.resourcePool,
      template: configs.userConfigs.template,
      vm_name: configs.userConfigs.VMName,
    });
  }

  public getStack(): TerraformStack {
    return this._stack;
  }
}

const app = new CdktfVsphereApp();
app.synth();