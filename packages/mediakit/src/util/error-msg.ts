interface MK_ErrorStringGen {
  title: string;
  message: string;
}

export const generateErrorString = (data: MK_ErrorStringGen): string =>
  `mediakit-error: Title: ${data.title} Message: ${data.message}`;
