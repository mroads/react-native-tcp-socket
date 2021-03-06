#import "TcpSocket.h"
#import <React/RCTLog.h>
#import "Communicator.h"


@implementation TcpSocket

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendDataToSocket:(NSString *)url port:(nonnull NSNumber *)port bytes:(NSString *)base64Encoded callback:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"url: %@ port: %@ bytes: %@", url, port, base64Encoded);
  int sockfd = tcpconnect_start_client([url UTF8String], [[port stringValue] UTF8String]);
  RCTLogInfo(@"sockfd111: %d ", sockfd);
  // NSData *bytes = [data dataUsingEncoding:NSUTF8StringEncoding];
  NSData *nsdataFromBase64String = [[NSData alloc]
  initWithBase64EncodedString:base64Encoded options:0];
 
  // Decoded NSString from the NSData
  NSString *base64Decoded = [[NSString alloc] 
    initWithData:nsdataFromBase64String encoding:NSUTF8StringEncoding];
  NSData *bytes = [base64Decoded dataUsingEncoding:NSUTF8StringEncoding];
    
  if(sockfd<0){
    callback(@[@"error connecting to socket"]);
    return;
  }

  
  ssize_t length = bytes.length;

  const char *buf = bytes.bytes;
  
  int chunkSize = 512 * 1024;

  while (length) {
    // Be prepared to non-blocking sockets
    size_t sendlen = length < chunkSize ? length : chunkSize;
    ssize_t len_written = write(sockfd, buf, sendlen);

    if (len_written < 0) {
      // error
      callback(@[@"data is empty"]);
      return;
    }

    length -= len_written;
    buf += len_written;
  }
  
  callback(@[[NSNull null], @"success"]);
  
  close(sockfd);
}

@end
