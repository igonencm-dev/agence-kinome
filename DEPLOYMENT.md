# Déploiement — agence-kinome.ch

Site **Next.js statique** (export HTML) hébergé sur **Hostinger**, déployé
automatiquement via **GitHub Actions** à chaque `push` sur la branche `main`.

## Architecture

```
GitHub (main)  ──push──►  GitHub Actions
                              │
                              ├─ npm ci
                              ├─ npm run build  →  out/
                              └─ upload SFTP    →  Hostinger /public_html
```

## ⚙️ Mise en place initiale (une seule fois)

### 1. Secrets GitHub

Aller sur : `https://github.com/igonencm-dev/agence-kinome/settings/secrets/actions`

Ajouter ces 5 **Repository secrets** :

| Nom                  | Valeur                                                              |
|----------------------|---------------------------------------------------------------------|
| `SFTP_HOST`          | `31.170.164.63`                                                     |
| `SFTP_PORT`          | `65002`                                                             |
| `SFTP_USERNAME`      | `u334827235`                                                        |
| `SFTP_PASSWORD`      | _(le mdp SSH Hostinger)_                                            |
| `SFTP_REMOTE_PATH`   | `/home/u334827235/domains/agence-kinome.ch/public_html` _(à confirmer après SSH ci-dessous)_ |

> ⚠️  Une fois ajoutés, ces secrets ne sont **plus jamais lisibles** depuis
> l'interface GitHub : ils s'écrasent uniquement.

### 2. Vérifier le chemin distant Hostinger

Le `SFTP_REMOTE_PATH` peut varier. Pour le confirmer :

```bash
ssh -p 65002 u334827235@31.170.164.63
pwd                                  # généralement /home/u334827235
ls domains/                          # liste des domaines
ls domains/agence-kinome.ch/public_html/   # racine du site
```

Le bon chemin est celui qui contient déjà `index.html` ou les fichiers
WordPress actuels.

### 3. Premier upload manuel du `config.php` SMTP

Le fichier `public/api/config.php` est exclu de Git (il contient le mot de
passe SMTP). Il faut le mettre en place sur Hostinger une seule fois.

```bash
# Depuis votre machine locale :
scp -P 65002 public/api/config.php \
  u334827235@31.170.164.63:/home/u334827235/domains/agence-kinome.ch/public_html/api/config.php
```

Le workflow GitHub Actions est configuré avec `delete_remote_files: false`,
donc le `config.php` ne sera jamais effacé par les déploiements futurs.

### 4. Backup du WordPress existant (avant la bascule)

Avant de pointer le DNS vers le nouveau site, sauvegarder l'actuel :

```bash
ssh -p 65002 u334827235@31.170.164.63
cd domains/agence-kinome.ch
tar czf ~/backup-wp-$(date +%Y%m%d).tar.gz public_html/
exit
# Puis depuis local, télécharger le tar :
scp -P 65002 u334827235@31.170.164.63:backup-wp-*.tar.gz ./
```

## 🚀 Déploiement quotidien

Une fois la mise en place terminée, **chaque commit push sur `main`** déclenche
le build + déploiement automatique. Suivre l'avancement sur :

`https://github.com/igonencm-dev/agence-kinome/actions`

Pour relancer un déploiement manuellement (sans changer le code) : onglet
**Actions** → **Build & Deploy → Hostinger SFTP** → bouton **Run workflow**.

## 🛠 Développement local

```bash
npm install                    # premier setup
npm run dev                    # serveur dev sur :3000
npm run build                  # build statique → out/
npx serve out -l 3101          # tester le build localement sur :3101
```

## 🔐 Sécurité — points d'attention

- Le mdp SMTP est dans `public/api/config.php` (jamais dans Git, sur Hostinger uniquement)
- Le mdp SSH est dans GitHub Secrets (chiffré, invisible)
- Si fuite suspectée : régénérer mdp sur Hostinger + mettre à jour `config.php`
  via SCP **et** mettre à jour `SFTP_PASSWORD` dans les secrets GitHub
- Le `.gitignore` exclut : `node_modules/`, `.next/`, `out/`, `public/api/config.php`,
  `.env*`

## 🧪 Tester le formulaire de contact en prod

Après le premier déploiement, faire un test depuis `https://agence-kinome.ch/contact/` :

- Remplir le formulaire avec une adresse mail réelle
- Vérifier réception du mail dans la boîte `contact@agence-kinome.ch`
- Vérifier réception du mail de confirmation dans la boîte du visiteur

Si erreur :

```bash
ssh -p 65002 u334827235@31.170.164.63
tail -50 ~/logs/agence-kinome.ch/error_log    # logs PHP
```
