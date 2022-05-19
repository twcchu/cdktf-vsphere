export const userConfigs = {
  username: '<vSphere username>',
  password: '<vSphere password>',
  resourcePool: 'rp-team-systems_platform',
  template: 'packer-centos-7',
  VMName: 'cdktf',
  tfcloudWorkspace: 'cdktf-vsphere',
  disks: [
    {
      label: 'disk0',
      size: 32,
    },
  ],
};

export const labEnvInfo = {
  datacenter: 'lab',
  datastoreCluster: 'lab-dsc-workload',
  network: 'LAB1-DC-APP7',
};
