{
  description = "Rust by Design: build pipeline for the book (Markdown -> PDF)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        # Chrome/Chromium is used to print the PDF. On macOS we use the
        # system Chrome (nixpkgs' chromium is Linux-only); set $CHROME to override.
        printer = pkgs.lib.optionals pkgs.stdenv.isLinux [ pkgs.chromium ];
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ pandoc python3 gnumake ] ++ printer;
        };
      });
}
