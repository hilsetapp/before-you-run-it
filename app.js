"use strict";

const $ = (selector) => document.querySelector(selector);
const codeEl = $("#code");
const resultsEl = $("#results");
const emptyEl = $("#empty");
const lineCountEl = $("#lineCount");
const toastEl = $("#toast");
const translations = {
  en: {
    brand: "Before You Run It",
    brandAria: "Before You Run It, home",
    howLink: "How it works",
    languageLabel: "Language",
    eyebrow: "LOCAL SCRIPT CHECK",
    heroLine1: "Look before you run.",
    heroLine2: "Know what it does.",
    heroCopy: "Paste an installer command or load a script. See which actions deserve a closer look.",
    heroNoteTitle: "Nothing is run.",
    heroNoteText: "The check happens in your browser. Your code is not sent to a server or saved.",
    workspaceAria: "Script checker",
    editorTitle: "Script to review",
    fileTypeAria: "File type",
    typeAuto: "Detect type",
    typeBatch: "Windows batch",
    codeAria: "Paste a script",
    codePlaceholder: "Paste a command or script here…",
    sampleBtn: "Load sample",
    fileBtn: "Choose file",
    analyzeBtn: "Review script",
    clearBtn: "Clear",
    resultTitle: "What we found",
    copyBtn: "Copy report",
    emptyTitle: "Your report will appear here",
    emptyText: "The checker looks for notable actions in the text. Results are clues to review, not proof that a script is safe or harmful.",
    supported: "PowerShell, Bash, sh, Windows batch files, and package.json are supported.",
    resultFoot: "Rules look for known text patterns. A script may build commands dynamically or download code that is not visible here.",
    trustAria: "How it works",
    trust1Title: "Stays on your device",
    trust1Text: "The check runs in this browser tab.",
    trust2Title: "Shows its evidence",
    trust2Text: "Each finding includes a matching line from the script.",
    trust3Title: "Does not run code",
    trust3Text: "Files are read as text. Commands are never launched.",
    aboutTitle: "How to read the results",
    aboutText: "The rules flag commands that can download and run code, change startup settings, touch sensitive files, or request elevated permissions. The same command can be part of a legitimate installer. Check the context and verify the source.",
    disclaimerTitle: "A clean report does not mean a file is safe.",
    disclaimerText: "This tool does not execute code or inspect binary files. It is not a replacement for antivirus software, an isolated virtual machine, or checking the publisher and file hash.",
    footerBrand: "Before You Run It · by hilsetapp",
    footerText: "The script stays in your browser. It is not uploaded.",
    dropOverlay: "Drop a file to load it",
    lineZero: "0 lines",
    line: { one: "line", other: "lines" },
    finding: { one: "finding", other: "findings" },
    item: { one: "item", other: "items" },
    emptyInput: "Paste a command or choose a file first.",
    unsupportedFile: "Choose a text script or package.json file.",
    fileTooLarge: "This file is over 1 MB. Paste the part you want to review instead.",
    loadedFile: "Loaded {name}",
    copied: "Report copied.",
    copyFailed: "Could not copy the report.",
    invalidJson: "This file is not valid JSON. Text rules were still applied.",
    noMatches: "No notable actions matched the enabled rules. That does not confirm the script is safe.",
    verdictHigh: "Review the flagged actions",
    verdictMedium: "Review these commands",
    verdictClear: "No rule matches found",
    verdictDescription: "Text-pattern review, not a safety verdict.",
    highAttention: "High attention",
    contextCheck: "Check the context",
    badgeHigh: "review",
    badgeMedium: "check",
    badgeInfo: "note",
    lineLabel: "Line",
    reportTitle: "Before You Run It report",
    reportType: "Type",
    reportFindings: "Findings",
    reportNoMatches: "No notable actions matched the enabled rules. This does not confirm safety.",
    reportFooter: "Text-pattern check only. Code was not run. This is not a safety verdict.",
    reportCode: "Code"
  },
  ru: {
    brand: "Перед запуском",
    brandAria: "Перед запуском, главная",
    howLink: "Как это работает",
    languageLabel: "Язык",
    eyebrow: "ЛОКАЛЬНАЯ ПРОВЕРКА СКРИПТОВ",
    heroLine1: "Сначала посмотрите.",
    heroLine2: "Потом запускайте.",
    heroCopy: "Вставьте команду установщика или загрузите скрипт. Мы отметим действия, которые стоит проверить.",
    heroNoteTitle: "Код не запускается.",
    heroNoteText: "Проверка идёт в браузере. Код не отправляется на сервер и не сохраняется.",
    workspaceAria: "Проверка скрипта",
    editorTitle: "Код для проверки",
    fileTypeAria: "Тип файла",
    typeAuto: "Определить тип",
    typeBatch: "Командный файл Windows",
    codeAria: "Вставьте скрипт",
    codePlaceholder: "Вставьте сюда команду или содержимое скрипта…",
    sampleBtn: "Загрузить пример",
    fileBtn: "Выбрать файл",
    analyzeBtn: "Разобрать скрипт",
    clearBtn: "Очистить",
    resultTitle: "Что удалось найти",
    copyBtn: "Скопировать отчёт",
    emptyTitle: "Отчёт появится здесь",
    emptyText: "Проверка ищет заметные действия в тексте. Результат помогает решить, что прочитать внимательнее, но не доказывает, что скрипт безопасен или вреден.",
    supported: "Поддерживаются PowerShell, Bash, sh, командные файлы Windows и package.json.",
    resultFoot: "Правила ищут известные признаки в тексте. Скрипт может собирать команды во время запуска или скачивать код, которого здесь не видно.",
    trustAria: "Принципы работы",
    trust1Title: "Остаётся у вас",
    trust1Text: "Проверка работает в этой вкладке браузера.",
    trust2Title: "Показывает основания",
    trust2Text: "У каждого замечания есть совпавшая строка скрипта.",
    trust3Title: "Ничего не исполняет",
    trust3Text: "Файл читается как текст. Команды не запускаются.",
    aboutTitle: "Как читать результат",
    aboutText: "Правила отмечают команды, которые могут скачивать и запускать код, менять автозапуск, обращаться к чувствительным файлам или запрашивать повышенные права. Та же команда может быть частью обычного установщика. Проверьте контекст и источник.",
    disclaimerTitle: "Чистый отчёт не означает, что файл безопасен.",
    disclaimerText: "Инструмент не исполняет код и не анализирует бинарные файлы. Он не заменяет антивирус, изолированную виртуальную машину или проверку издателя и контрольной суммы файла.",
    footerBrand: "Перед запуском · проект hilsetapp",
    footerText: "Скрипт остаётся в браузере и не загружается на сервер.",
    dropOverlay: "Отпустите файл, чтобы загрузить его",
    lineZero: "0 строк",
    line: { one: "строка", few: "строки", many: "строк", other: "строки" },
    finding: { one: "совпадение", few: "совпадения", many: "совпадений", other: "совпадения" },
    item: { one: "пункт", few: "пункта", many: "пунктов", other: "пункта" },
    emptyInput: "Сначала вставьте команду или выберите файл.",
    unsupportedFile: "Выберите текстовый скрипт или файл package.json.",
    fileTooLarge: "Файл больше 1 МБ. Вставьте нужный фрагмент вручную.",
    loadedFile: "Загружен файл {name}",
    copied: "Отчёт скопирован.",
    copyFailed: "Не удалось скопировать отчёт.",
    invalidJson: "Файл не является корректным JSON. Поиск по текстовым правилам всё равно выполнен.",
    noMatches: "По включённым правилам заметных действий не найдено. Это не подтверждает безопасность скрипта.",
    verdictHigh: "Проверьте отмеченные действия",
    verdictMedium: "Перед запуском проверьте эти команды",
    verdictClear: "Совпадений с правилами не найдено",
    verdictDescription: "Проверка по текстовым признакам, а не вердикт о безопасности.",
    highAttention: "Повышенное внимание",
    contextCheck: "Проверьте контекст",
    badgeHigh: "важно",
    badgeMedium: "проверить",
    badgeInfo: "заметка",
    lineLabel: "Строка",
    reportTitle: "Отчёт Перед запуском",
    reportType: "Тип файла",
    reportFindings: "Совпадения",
    reportNoMatches: "По включённым правилам заметных действий не найдено. Это не подтверждает безопасность.",
    reportFooter: "Проверка только по текстовым признакам. Код не запускался. Это не вердикт о безопасности.",
    reportCode: "Код"
  }
};

const ruleTranslations = {
  "download-execute": { category: "Загрузка и запуск", title: "Загружает код или файл из сети", why: "Загрузка сама по себе не означает угрозу. Проверьте домен, подпись файла и способ проверки целостности." },
  "pipe-shell": { category: "Загрузка и запуск", title: "Передаёт скачанный текст прямо интерпретатору", why: "Связка загрузки и запуска не оставляет удобного шага для проверки скачанного содержимого." },
  encoded: { category: "Скрытые команды", title: "Есть декодирование или запуск скрытого содержимого", why: "Закодированные команды могут скрывать обычную логику или вредное действие. Здесь показано только совпадение в тексте." },
  elevation: { category: "Права доступа", title: "Запрашивает или использует повышенные права", why: "Администраторские права расширяют последствия ошибок. Проверьте, зачем они нужны установщику." },
  "persistence-run": { category: "Автозапуск", title: "Меняет место автоматического запуска", why: "Программа может запускаться при входе в систему. Убедитесь, что это ожидаемая часть установки." },
  service: { category: "Системные службы", title: "Создаёт или меняет службу", why: "Служба может работать в фоне и стартовать вместе с Windows. Проверьте её имя и команду запуска." },
  sensitive: { category: "Чувствительные данные", title: "Обращается к возможному хранилищу секретов", why: "Совпадение показывает путь или имя переменной в тексте, но не доказывает успешное чтение или отправку данных." },
  destructive: { category: "Удаление или очистка", title: "Есть команда удаления с широким охватом", why: "Проверьте путь и условия выполнения. Маски и рекурсивное удаление могут затронуть много файлов." },
  defender: { category: "Защита системы", title: "Меняет настройки защиты или исключения антивируса", why: "Проверьте причину и точный путь. Исключение может скрыть файлы от проверки." },
  "download-domain": { category: "Сетевые адреса", title: "Содержит внешний адрес", why: "Адрес может быть сервером загрузки, API или ссылкой в комментарии. Само наличие адреса не говорит о вредоносности." },
  "child-shell": { category: "Запуск других программ", title: "Запускает командную оболочку или дочерний процесс", why: "Посмотрите, какая именно команда будет запущена и откуда получены её аргументы." },
  "npm-hooks": { category: "Сценарии установки пакета", title: "В package.json есть сценарий, запускаемый при установке или сборке", why: "Проверьте точную команду и файлы, которые она запускает. Это может быть нужно пакету, но код выполнится в процессе установки." },
  "external-dep": { category: "Зависимости", title: "Есть зависимость из внешнего репозитория или по прямой ссылке", why: "Проверьте владельца репозитория, версию и контрольную сумму, если она указана." }
};

const rules = [
  { id: "download-execute", level: "high", category: "Network download", title: "Downloads a file or code from the internet", why: "A download is not automatically malicious. Check the domain, file signature, and integrity checks.", test: /\b(Invoke-WebRequest|Invoke-RestMethod|Start-BitsTransfer|DownloadString|DownloadFile|curl|wget|bitsadmin|certutil)\b/i },
  { id: "pipe-shell", level: "high", category: "Download and execution", title: "Pipes downloaded text directly into an interpreter", why: "Combining a download and immediate execution leaves little room to inspect the downloaded content first.", test: /(curl|wget|Invoke-WebRequest|iwr|irm)[^\n]*(\||;|&&)\s*(bash|sh|iex|Invoke-Expression)|\b(curl|wget)\b[^\n]*\|\s*(sudo\s+)?(bash|sh)\b/i },
  { id: "encoded", level: "medium", category: "Hidden commands", title: "Decodes or runs hidden content", why: "Encoded commands can hide ordinary logic or harmful actions. This match only identifies text in the script.", test: /\b(FromBase64String|base64\s+(-d|--decode)|-EncodedCommand|\biex\b|Invoke-Expression|eval\s*\(|\beval\b)\b/i },
  { id: "elevation", level: "medium", category: "Permissions", title: "Requests or uses elevated permissions", why: "Administrator rights increase the impact of mistakes. Check why the installer needs them.", test: /\b(Start-Process\s+.*-Verb\s+RunAs|sudo\b|doas\b|RunAs\b|#Requires\s+-RunAsAdministrator|net\s+session)\b/i },
  { id: "persistence-run", level: "high", category: "Startup behavior", title: "Changes a startup location", why: "The program may run when you sign in. Confirm that this is an expected part of the installation.", test: /(CurrentVersion\\Run|CurrentVersion\/Run|\\RunOnce|schtasks\s+.*\/create|Register-ScheduledTask|New-ScheduledTask|crontab\s+-|\/etc\/cron|systemctl\s+enable|\.bashrc|\.zshrc|\.profile|Startup\\)/i },
  { id: "service", level: "medium", category: "System services", title: "Creates or changes a service", why: "A service can run in the background and start with Windows. Check its name and launch command.", test: /\b(New-Service|sc\.exe?\s+create|sc\s+create|systemctl\s+(enable|install)|launchctl\s+load)\b/i },
  { id: "sensitive", level: "high", category: "Sensitive data", title: "References a possible secret store", why: "The match shows a path or variable in the text. It does not prove that data was read or sent anywhere.", test: /(\.ssh|\.aws|\.azure|\.kube|wallet|Chrome\\User Data|Firefox\\Profiles|Login Data|Local State|AWS_SECRET|GITHUB_TOKEN|NPM_TOKEN|SSH_AUTH_SOCK|process\.env|\$env:)/i },
  { id: "destructive", level: "high", category: "Deletion", title: "Contains a broad deletion command", why: "Check the target path and conditions. Wildcards and recursive deletion can affect many files.", test: /\b(Remove-Item\b[^\n]*(-Recurse|-Force)|rm\s+-[^\n]*(r|f)[^\n]*\s+\/|del\s+\/s|rmdir\s+\/s|format\s+[a-z]:|diskpart|shred\s|wipefs\s)/i },
  { id: "defender", level: "high", category: "System protection", title: "Changes security settings or antivirus exclusions", why: "Check the reason and exact path. An exclusion can hide files from security scans.", test: /\b(Add-MpPreference|Set-MpPreference|DisableRealtimeMonitoring|ExclusionPath|ExclusionProcess|Set-MpPreference|bcdedit\s+.*(testsigning|nointegritychecks))\b/i },
  { id: "download-domain", level: "info", category: "Network addresses", title: "Contains an external URL", why: "The URL could be a download host, API, or comment link. Its presence alone says nothing about intent.", test: /https?:\/\/[^\s'"<>]+/i, all: true },
  { id: "child-shell", level: "medium", category: "Process launch", title: "Starts a shell or child process", why: "Check which command will run and where its arguments come from.", test: /\b(Start-Process|Start-Job|cmd\.exe|powershell(?:\.exe)?|pwsh|bash\s+-c|sh\s+-c|child_process|execSync|spawnSync|subprocess\.(run|Popen)|os\.system)\b/i },
  { id: "npm-hooks", level: "medium", category: "Package install scripts", title: "package.json defines an install or build hook", why: "Review the command and the files it invokes. These hooks can run during package installation.", test: /"(preinstall|install|postinstall|prepare)"\s*:/i },
  { id: "external-dep", level: "info", category: "Dependencies", title: "References a dependency from an external repository or URL", why: "Check the repository owner, version, and any integrity hash provided.", test: /(github:|git\+https?:|https?:\/\/[^\s"']+\.(tgz|zip)|"resolved"\s*:\s*"https?:)/i }
];

const ruleRu = ruleTranslations;
const sample = `# Example desktop app installer\n$ProgressPreference = 'SilentlyContinue'\n$url = 'https://downloads.example.org/desktool.zip'\n$dest = Join-Path $env:LOCALAPPDATA 'DeskTool'\nNew-Item -ItemType Directory -Force -Path $dest | Out-Null\nInvoke-WebRequest -Uri $url -OutFile "$dest\\desktool.zip"\nExpand-Archive "$dest\\desktool.zip" -DestinationPath $dest -Force\nSet-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' -Name 'DeskTool' -Value "$dest\\desktool.exe"\nStart-Process "$dest\\desktool.exe"`;

let currentLanguage = "en";
let currentAnalysis = null;
let toastTimer;

function t(key, values = {}) {
  let text = translations[currentLanguage][key] ?? translations.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function pluralWord(key, count) {
  const rules = new Intl.PluralRules(currentLanguage);
  const form = rules.select(count);
  const words = translations[currentLanguage][key];
  return words[form] || words.other;
}

function countPhrase(key, count) {
  return `${count} ${pluralWord(key, count)}`;
}

function applyMetadata(language) {
  const ru = language === "ru";
  const title = ru ? "Проверка установочных скриптов | Перед запуском" : "Installer Script Checker | Before You Run It";
  const description = ru
    ? "Проверьте установочный скрипт до запуска. Локальный разбор PowerShell, Bash, sh, bat, cmd и package.json с указанием строк для проверки."
    : "Review installer scripts before running them. Local browser checks for PowerShell, Bash, sh, Windows batch files, and package.json, with matching lines shown.";
  const siteName = ru ? "Перед запуском" : "Before You Run It";
  const ogTitle = ru ? "Перед запуском: проверка установочных скриптов" : "Before You Run It: installer script checker";
  const image = `https://hilsetapp.github.io/pered-zapuskom/assets/og-card-${language}.png`;
  document.title = title;
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[name="application-name"]').content = siteName;
  document.querySelector('meta[property="og:locale"]').content = ru ? "ru_RU" : "en_US";
  document.querySelector('meta[property="og:site_name"]').content = siteName;
  document.querySelector('meta[property="og:title"]').content = ogTitle;
  document.querySelector('meta[property="og:description"]').content = description;
  document.querySelector('meta[property="og:image"]').content = image;
  document.querySelector('meta[property="og:image:alt"]').content = ru ? "Перед запуском, локальная проверка установочных скриптов" : "Before You Run It, a local installer script checker";
  document.querySelector('meta[name="twitter:title"]').content = ogTitle;
  document.querySelector('meta[name="twitter:description"]').content = description;
  document.querySelector('meta[name="twitter:image"]').content = image;
  const schema = document.querySelector('script[type="application/ld+json"]');
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: "https://hilsetapp.github.io/pered-zapuskom/",
    description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    inLanguage: ru ? "ru-RU" : "en",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true
  });
}

function applyLanguage(language, save = true) {
  currentLanguage = language === "ru" ? "ru" : "en";
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  applyMetadata(currentLanguage);
  updateCount();
  if (save) {
    try { localStorage.setItem("pered-zapuskom-language", currentLanguage); } catch (_) {}
  }
  if (currentAnalysis) renderResults(currentAnalysis);
}

const enFileTypeNames = { powershell: "PowerShell", shell: "Bash or sh", batch: "Windows batch", package: "package.json" };
const ruFileTypeNames = { powershell: "PowerShell", shell: "Bash или sh", batch: "Командный файл Windows", package: "package.json" };
function fileTypeName(type) {
  return (currentLanguage === "ru" ? ruFileTypeNames : enFileTypeNames)[type] || type;
}

const ranks = { high: 0, medium: 1, info: 2 };
function linesFor(text, expression, all = false) {
  const matches = [];
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (expression.test(line)) {
      matches.push({ number: index + 1, text: line.trim().slice(0, 260) });
      if (!all) break;
    }
  }
  return matches;
}

function detectType(text, name = "") {
  const lowerName = name.toLowerCase();
  if (lowerName.endsWith(".json") || /^\s*\{[\s\S]*"(scripts|dependencies)"/.test(text)) return "package";
  if (/\.ps1$|\.psm1$/.test(lowerName) || /\b(Write-Host|Invoke-WebRequest|Set-ItemProperty|Get-ChildItem|New-Item|Start-Process)\b/i.test(text)) return "powershell";
  if (/\.(bat|cmd)$/.test(lowerName) || /\b(reg\s+add|schtasks|@echo\s+off|setlocal|powershell\.exe)\b/i.test(text)) return "batch";
  return "shell";
}

function analyze(text, type) {
  const notes = [];
  if (type === "package") {
    try { JSON.parse(text); } catch (_) { notes.push("invalidJson"); }
  }
  const findings = [];
  for (const rule of rules) {
    if (type === "package" && !["npm-hooks", "download-execute", "pipe-shell", "encoded", "sensitive", "destructive", "external-dep", "child-shell", "elevation"].includes(rule.id)) continue;
    if (type !== "package" && rule.id === "npm-hooks") continue;
    const matches = linesFor(text, rule.test, rule.all);
    for (const match of matches.slice(0, rule.all ? 6 : 1)) findings.push({ ...rule, line: match.number, evidence: match.text });
  }
  const unique = new Map();
  for (const finding of findings) {
    const key = `${finding.id}|${finding.line}`;
    if (!unique.has(key)) unique.set(key, finding);
  }
  const ordered = [...unique.values()].sort((a, b) => ranks[a.level] - ranks[b.level] || a.line - b.line);
  if (!ordered.length && text.trim()) notes.push("noMatches");
  return { type, findings: ordered, notes };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function localizedRule(finding) {
  return currentLanguage === "ru" ? { ...finding, ...ruleRu[finding.id] } : finding;
}

function makeReport(analysis) {
  const findings = analysis.findings;
  const high = findings.filter((finding) => finding.level === "high").length;
  const medium = findings.filter((finding) => finding.level === "medium").length;
  const lines = [
    t("reportTitle"),
    `${t("reportType")}: ${fileTypeName(analysis.type)}`,
    `${t("reportFindings")}: ${countPhrase("finding", findings.length)}`,
    ""
  ];
  if (!findings.length) lines.push(t("reportNoMatches"), "");
  for (const rawFinding of findings) {
    const finding = localizedRule(rawFinding);
    lines.push(`${t("lineLabel")} ${finding.line}. ${finding.title}`, finding.why, `${t("reportCode")}: ${finding.evidence}`, "");
  }
  if (analysis.notes.includes("invalidJson")) lines.push(t("invalidJson"));
  if (high || medium) lines.push(`${t("highAttention")}: ${countPhrase("item", high)}`, `${t("contextCheck")}: ${countPhrase("item", medium)}`);
  lines.push("", t("reportFooter"));
  return lines.join("\n");
}

function renderResults(analysis) {
  const findings = analysis.findings;
  const high = findings.filter((finding) => finding.level === "high").length;
  const medium = findings.filter((finding) => finding.level === "medium").length;
  const verdict = high ? t("verdictHigh") : medium ? t("verdictMedium") : t("verdictClear");
  const stateColor = high ? "var(--red)" : medium ? "var(--amber)" : "var(--muted)";
  let html = `<div class="verdict"><div class="verdict-top"><span class="status-dot" style="background:${stateColor};box-shadow:0 0 12px ${high ? "#ff827d88" : medium ? "#f2c66d88" : "#98a49c55"}"></span><strong>${escapeHtml(verdict)}</strong></div><p>${escapeHtml(fileTypeName(analysis.type))} · ${escapeHtml(countPhrase("finding", findings.length))}. ${escapeHtml(t("verdictDescription"))}</p></div>`;
  html += `<div class="summary-grid"><div class="summary-box"><div class="summary-label">${escapeHtml(t("highAttention"))}</div><div class="summary-value">${high} <small>${escapeHtml(pluralWord("item", high))}</small></div></div><div class="summary-box"><div class="summary-label">${escapeHtml(t("contextCheck"))}</div><div class="summary-value">${medium} <small>${escapeHtml(pluralWord("item", medium))}</small></div></div></div>`;
  if (analysis.notes.length) html += `<div class="analysis-notes">${analysis.notes.map((note) => `<p>${escapeHtml(t(note))}</p>`).join("")}</div>`;
  html += '<div class="finding-list">';
  for (const rawFinding of findings) {
    const finding = localizedRule(rawFinding);
    const badge = finding.level === "high" ? "badgeHigh" : finding.level === "medium" ? "badgeMedium" : "badgeInfo";
    html += `<article class="finding"><div class="finding-head"><span class="badge ${finding.level}">${escapeHtml(t(badge))}</span><h3>${escapeHtml(finding.title)}</h3></div><p>${escapeHtml(finding.why)}</p><code class="evidence"><span class="line">${escapeHtml(t("lineLabel"))} ${finding.line}</span>${escapeHtml(finding.evidence)}</code><div class="source-tag">${escapeHtml(finding.category)}</div></article>`;
  }
  html += "</div>";
  resultsEl.innerHTML = html;
  resultsEl.dataset.report = makeReport(analysis);
  emptyEl.classList.add("hidden");
  resultsEl.classList.add("show");
  $("#copyBtn").classList.remove("hidden");
}

function render() {
  const text = codeEl.value;
  if (!text.trim()) { toast(t("emptyInput")); return; }
  const selectedType = $("#language").value;
  const type = selectedType === "auto" ? detectType(text, codeEl.dataset.filename || "") : selectedType;
  currentAnalysis = analyze(text, type);
  renderResults(currentAnalysis);
}

function updateCount() {
  const count = codeEl.value ? codeEl.value.split(/\r?\n/).length : 0;
  lineCountEl.textContent = count === 0 ? t("lineZero") : countPhrase("line", count);
}

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("on"), 2300);
}

function clearInput() {
  codeEl.value = "";
  codeEl.dataset.filename = "";
  resultsEl.innerHTML = "";
  resultsEl.classList.remove("show");
  emptyEl.classList.remove("hidden");
  $("#copyBtn").classList.add("hidden");
  currentAnalysis = null;
  updateCount();
  codeEl.focus();
}

async function loadTextFile(file) {
  if (!file) return;
  const supported = /\.(ps1|psm1|sh|bash|zsh|command|bat|cmd|json|txt)$/i.test(file.name);
  if (!supported) { toast(t("unsupportedFile")); return; }
  if (file.size > 1000000) { toast(t("fileTooLarge")); return; }
  try {
    codeEl.value = await file.text();
    codeEl.dataset.filename = file.name;
    $("#language").value = "auto";
    updateCount();
    toast(t("loadedFile", { name: file.name }));
  } catch (_) {
    toast(t("unsupportedFile"));
  }
}

$("#analyzeBtn").addEventListener("click", render);
$("#clearBtn").addEventListener("click", clearInput);
$("#sampleBtn").addEventListener("click", () => {
  codeEl.value = sample;
  $("#language").value = "powershell";
  codeEl.dataset.filename = "sample.ps1";
  updateCount();
  render();
});
$("#fileBtn").addEventListener("click", () => $("#fileInput").click());
$("#fileInput").addEventListener("change", async (event) => {
  await loadTextFile(event.target.files[0]);
  event.target.value = "";
});
codeEl.addEventListener("input", updateCount);
codeEl.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    render();
  }
});
$("#copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultsEl.dataset.report || "");
    toast(t("copied"));
  } catch (_) {
    toast(t("copyFailed"));
  }
});
document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));

const overlay = $("#dropOverlay");
let dragDepth = 0;
window.addEventListener("dragenter", (event) => {
  if ([...event.dataTransfer.types].includes("Files")) {
    event.preventDefault();
    dragDepth += 1;
    overlay.classList.add("on");
  }
});
window.addEventListener("dragleave", () => {
  if (dragDepth > 0) dragDepth -= 1;
  if (dragDepth === 0) overlay.classList.remove("on");
});
window.addEventListener("dragover", (event) => event.preventDefault());
window.addEventListener("drop", async (event) => {
  event.preventDefault();
  dragDepth = 0;
  overlay.classList.remove("on");
  await loadTextFile(event.dataTransfer.files[0]);
});

let initialLanguage = "en";
try {
  const savedLanguage = localStorage.getItem("pered-zapuskom-language");
  if (savedLanguage === "ru" || savedLanguage === "en") initialLanguage = savedLanguage;
} catch (_) {}
applyLanguage(initialLanguage, false);
