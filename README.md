# 🤖 DTec — Desafio Tecnológico UFC

Site oficial do **DTec**, um dos principais eventos de inovação tecnológica da Universidade Federal do Ceará (UFC). O site apresenta informações sobre o evento, countdown, galeria de fotos e cronograma de temas.

---

## 🔗 Acesso

> Deploy via GitHub Pages:  
> `https://davodoctoribus.github.io/site-midias-dtec/`

---

## 📁 Estrutura do Projeto

```
site-midias-dtec/
│
├── index.html          # Estrutura principal da página
├── style.css           # Estilos e responsividade
├── script.js           # Lógica de interação (countdown, sliders, lightbox)
│
└── assets/
    ├── logoDtec.svg
    ├── hero.png
    ├── background-img.jpg
    ├── iot.jpg
    ├── IA.jpg
    ├── programação.jpg
    ├── img-evento.jpg
    ├── img-evento2.jpg
    ├── img-evento3.jpg
    ├── img-evento4.jpg
    ├── img-evento5.jpg
    ├── img-evento6.jpg
    ├── patrocinador.png
    ├── Seguidor de Linha.png
    └── track/
        └── style.css   # Fonte customizada "Track"
```

---

## ✨ Funcionalidades

- **Header fixo** com menu responsivo (hambúrguer no mobile)
- **Hero section** com imagem de destaque
- **Countdown** em tempo real até a data do evento com animação de carrinho na pista
- **Seção Sobre** com descrição do evento e logos de patrocinadores
- **Slider de temas** (IoT, IA, Programação) com drag, dots e autoplay
- **Galeria de fotos** com paginação, autoplay e lightbox para zoom
- **Botão voltar ao topo** com scroll suavizado
- **Layout totalmente responsivo** (mobile, tablet e desktop)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla) | Interatividade |
| [Font Awesome](https://fontawesome.com/) | Ícones |
| [Boxicons](https://boxicons.com/) | Ícones |
| [Google Fonts](https://fonts.google.com/) | Fontes Maven Pro e Dosis |

---

## 🎨 Paleta de Cores

| Nome | Hex |
|---|---|
| Roxo DTec | `#30115F` |
| Azul DTec | `#020526` |
| Azul Escuro DTec | `#0c0620` |
| Amarelo DTec | `#ecc440` |
| Cinza Raitec | `#e6e6e6` |

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/davodoctoribus/site-midias-dtec.git

# Entre na pasta
cd site-midias-dtec

# Abra o index.html no navegador
# (ou use a extensão Live Server no VS Code)
```

> Não há dependências ou build necessários — é um projeto estático puro.

---

## 📅 Atualizar data do evento

No arquivo `script.js`, altere a linha:

```js
const EVENT_DATE = new Date("2026-05-11T00:00:00");
```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b minha-feature`
2. Faça suas alterações e commit: `git commit -m "feat: minha feature"`
3. Envie para o repositório: `git push origin minha-feature`
4. Abra um Pull Request

---

## 👥 Equipe

Desenvolvido pela equipe de mídias do **DTec UFC** — Raitec UFC.

---

*© 2026 DTec UFC. Todos os direitos reservados.*
