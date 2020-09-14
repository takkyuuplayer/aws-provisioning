terraform {
  required_version = ">= 0.13"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.6.0"
    }
  }
  backend "s3" {
    bucket = "tp-tfstate"
    key    = "aws-provisioning/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_route53_record" "takkyuuplayer_com-mx-gmail" {
  name = "takkyuuplayer.com"
  records = [
    "1 ASPMX.L.GOOGLE.COM",
    "10 ALT3.ASPMX.L.GOOGLE.COM",
    "10 ALT4.ASPMX.L.GOOGLE.COM",
    "5 ALT1.ASPMX.L.GOOGLE.COM",
    "5 ALT2.ASPMX.L.GOOGLE.COM",
  ]
  ttl     = 3600
  type    = "MX"
  zone_id = "Z1TMUF6CTI3C2U"
}
