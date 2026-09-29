#!/bin/bash
# Définit (ou redéfinit) le mot de passe du tableau de bord
# https://agence-kinome.ch/admin/
#
# Le mot de passe est saisi ici, sans écho, transmis par la connexion SSH
# chiffrée et haché sur le serveur (password_hash). Il n'est écrit en clair
# nulle part, ni sur ce Mac, ni sur le serveur.
#
# Usage : bash scripts/admin-motdepasse.sh
set -euo pipefail
cd "$(dirname "$0")"

HOTE="u334827235@31.170.164.63"
PORT=65002
CLE="$HOME/.ssh/kinome_deploy"
DATA="domains/agence-kinome.ch/data"

read -r -s -p "Nouveau mot de passe du tableau de bord (12 caractères minimum) : " P1; echo
read -r -s -p "Confirmez : " P2; echo
if [ "$P1" != "$P2" ]; then echo "Les deux saisies diffèrent, rien n'a été changé."; exit 1; fi
if [ "${#P1}" -lt 12 ]; then echo "12 caractères minimum, rien n'a été changé."; exit 1; fi

ssh -i "$CLE" -p "$PORT" "$HOTE" "mkdir -p $DATA && chmod 700 $DATA"
scp -q -i "$CLE" -P "$PORT" serveur/definir-mot-de-passe.php "$HOTE:$DATA/definir-mot-de-passe.php"
printf '%s' "$P1" | ssh -i "$CLE" -p "$PORT" "$HOTE" "php $DATA/definir-mot-de-passe.php; rm -f $DATA/definir-mot-de-passe.php"
unset P1 P2
