import 'cdktf/lib/testing/adapters/jest'; // Load types for expect matchers

import { Testing } from 'cdktf';

import * as vsphere from '../.gen/providers/vsphere';
import * as configs from '../configs';
import { MyStack } from '../stack';


describe('My CDKTF Application', () => {
  // The tests below are example tests, you can find more information at
  // https://cdk.tf/testing

  it('contains necessary resources', () => {
    const app = Testing.app();
    const stack = new MyStack(app, 'test', {
      user: 'un',
      password: 'pw',
      datacenter: configs.labEnvInfo.datacenter,
      datastoreCluster: configs.labEnvInfo.datastoreCluster,
      network: configs.labEnvInfo.network,
      rp_name: configs.userConfigs.resourcePool,
      template: configs.userConfigs.template,
      vm_name: configs.userConfigs.VMName,
      disks: configs.userConfigs.disks,
      cdktf_options: {
        tfcloud_workspace: configs.userConfigs.tfcloudWorkspace,
      },
    });

    expect(Testing.synth(stack)).toHaveDataSourceWithProperties(vsphere.DataVsphereDatacenter, {
      name: configs.labEnvInfo.datacenter,
    });
    expect(Testing.synth(stack)).toHaveDataSourceWithProperties(vsphere.DataVsphereDatastoreCluster, {
      name: configs.labEnvInfo.datastoreCluster,
    });
    expect(Testing.synth(stack)).toHaveDataSourceWithProperties(vsphere.DataVsphereNetwork, {
      name: configs.labEnvInfo.network,
    });
    expect(Testing.synth(stack)).toHaveDataSourceWithProperties(vsphere.DataVsphereResourcePool, {
      name: configs.userConfigs.resourcePool,
    });
    expect(Testing.synth(stack)).toHaveDataSourceWithProperties(vsphere.DataVsphereVirtualMachine, {
      name: configs.userConfigs.template,
    });
    expect(Testing.synth(stack)).toHaveResourceWithProperties(vsphere.VirtualMachine, {
      name: configs.userConfigs.VMName,
      disk: configs.userConfigs.disks,
      wait_for_guest_net_timeout: 0,
    });
  });
});
