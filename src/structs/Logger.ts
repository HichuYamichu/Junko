import { utc } from 'moment';
import { inspect } from 'util';

export class Logger {
  public static info(content: string): void {
    const level = 'INFO';
    this.write(level, content);
  }

  public static warn(content: string): void {
    const level = 'WARN';
    this.write(level, content);
  }

  public static error(content?: string | Record<string, unknown> | null | Error): void {
    const level = 'ERROR';
    this.write(level, content);
  }

  private static write(
    level: string, content?: string | Record<string, unknown> | null | Error
  ): void {
    const out = level === 'ERROR' ? process.stderr : process.stdout;
    const now = utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${this.clean(content)}\n`;
    out.write(log);
  }

  private static clean(item?: string | Record<string, unknown> | null | Error): string {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: Infinity });
    return cleaned;
  }
}
