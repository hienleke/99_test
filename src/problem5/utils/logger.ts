export function log(message: string) {
  const logMsg = `${new Date().toISOString()} ${message || ' '}\n`;
  console.log(logMsg.trim());
}
