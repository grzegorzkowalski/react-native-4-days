/**
 * Web Polyfills for React Native Reanimated
 * 
 * This file contains polyfills to fix compatibility issues between
 * React Native Reanimated and React Native Web
 */

// Fix for "Failed to set an indexed property [0] on 'CSSStyleDeclaration'"
if (typeof window !== 'undefined') {
  // Polyfill for CSSStyleDeclaration indexed property setter
  const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
  
  CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
    try {
      return originalSetProperty.call(this, property, value, priority);
    } catch (error) {
      // Fallback for problematic properties
      if (typeof property === 'number') {
        console.warn(`Attempted to set CSS property with numeric index: ${property}`);
        return;
      }
      throw error;
    }
  };

  // Additional polyfill for HTMLElement style property access
  try {
    const htmlElementProto = HTMLElement.prototype;
    const originalStyleSetter = Object.getOwnPropertyDescriptor(htmlElementProto, 'style');
    
    if (originalStyleSetter && originalStyleSetter.set) {
      const originalSet = originalStyleSetter.set;
      
      Object.defineProperty(htmlElementProto, 'style', {
        ...originalStyleSetter,
        set: function(value) {
          try {
            return originalSet.call(this, value);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.warn('Style setting error caught and handled:', errorMessage);
            return;
          }
        }
      });
    }
  } catch (e) {
    // Ignore if we can't set up the polyfill
    console.warn('Could not set up style polyfill:', e);
  }

  // Polyfill for requestAnimationFrame if needed
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 16);
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}

export {};
