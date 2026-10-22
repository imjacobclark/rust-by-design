# Part II: A Cloudflare Dynamic DNS Daemon

*Our first real program is a small daemon that notices when your home's public IP address changes and points your Cloudflare DNS records at the new one. It's small enough to hold in your head and real enough to run for years, and over five chapters it carries a whole architecture: a domain spoken in types, a pure decision at the centre, ports and adapters at the edges, a careful shell around it all, and a NixOS module that brings the same typed thinking to deployment.*
