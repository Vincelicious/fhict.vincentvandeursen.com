# Statamic 2 Starter Theme: Alethkar

Alethkar is a starter theme designed to give you a head start when building your next Statamic 2 website.

## Features
- Includes [TailwindCSS](https://tailwindcss.com)
- Uses [Laravel Mix](https://laravel-mix.com/)
- [PurgeCSS](https://purgecss.com/) for that tiny css file size

## Quick Start
**1. Add theme to Statamic** 

Clone the repo into the `site/themes` folder and remove the origin repo.
```
git clone https://github.com/Vincelicious/alethkar
cd alethkar
rm -rf .git
```

**2. Change current theme**

Go to `site/settings/theming.yaml` and change the value of theme to `alethkar`. If the file is blank, simply add `theme: alethkar` and save.

**3. Install dependencies**

Install dependencies with `npm install` and build assets with `npm run dev` or `npm run watch`.

**4. Do your thing!**

Make something amazing.