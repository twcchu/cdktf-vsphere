# vSphere with Terraform CDK
This repository contains a Terraform CDK app for provisioning/managing VMs in vSphere.

## CDK for Terraform (CDKTF)
Cloud Development Kit for Terraform allows you to define and provision infrastructure using a programming language you are comfortable with (i.e. TypeScript, Python, Java, C#, and Go (experimental)).  
CDKTF synthesizes your infrastructure code into JSON configuration files that can be used by Terraform. It leverages concepts and libraries from the AWS Cloud Development Kit.  
See [CDK for Terraform](https://www.terraform.io/cdktf) for more details.

## Requirements 
* [Terraform CLI](https://www.terraform.io/downloads.html) >= v1.0+
* [Node.js](https://nodejs.org/) >= v16+
* [Terraform CDK](https://www.terraform.io/cdktf): `npm install --global cdktf-cli@latest`

## Deploy app
1. Run `npm install` to install required packages
2. Run `cdktf get -l typescript` to get the vSphere provider
3. Update the [configs.ts](https://github.com/twcchu/cdktf-vsphere/blob/main/configs.ts) file with your vSphere username and password
4. Run `cdktf deploy` (Terraform will automatically configure a `local` backend unless a remote backend is configured. See [Configure Remote Backend](#configure-remote-backend) for more details.) 
5. Look over plan and `approve` changes

## Test app
Tests are located in the `__tests__` directory [main-test.ts](https://github.com/twcchu/cdktf-vsphere/blob/main/__tests__/main-test.ts) file. 
1. Run `npm run test` in the root directory `cdktf-vsphere`

## Remove infrastructure
1. Run `cdktf destroy`
2. Look over plan and `approve` changes

## Other useful tips

### To Generate Providers
Provider bindings are generated by running cdktf get. See https://cdk.tf/provider-generation for more details.
1. Add Provider to list of `terraformProviders` in [cdktf.json](https://github.com/twcchu/cdktf-vsphere/blob/main/cdktf.json)
2. Run `cdktf get -l typescript`

### Configure Remote Backend
The following steps describe how to setup a Terraform Cloud remote backend for this app. We are currently only using TFc for state management. See [CDKTF - Remote Backends](https://www.terraform.io/cdktf/concepts/remote-backends) for more details and other supported backends.
1. Uncomment the `new RemoteBackend` block in [stack.ts](https://github.com/twcchu/cdktf-vsphere/blob/main/stack.ts)
2. Update the `hostname` and `organization` as needed
3. Update the [configs.ts](https://github.com/twcchu/cdktf-vsphere/blob/main/configs.ts) file with your Terraform Cloud workspace (`tfcloudWorkspace`)
4. Run `cdktf synth` to generate the Terraform configuration file
5. Run `cp terraform.cdktf-vsphere.tfstate cdktf.out/stacks/cdktf-vsphere` to copy the Terraform state file into the output directory
6. Navigate to the output directory: `cd cdktf.out/stacks/cdktf-vsphere`
7. Run `terraform init -migrate-state` to initialize the backend
8. Run `terraform state push -force terraform.cdktf-vsphere.tfstate` to push the state to your Terraform Cloud workspace